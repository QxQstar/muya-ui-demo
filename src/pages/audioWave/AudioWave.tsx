import React, { useState } from 'react'

export default function AudioWave() {
    const [loading, setLoading] = useState<boolean>(true);

    function onUpload(ev: React.ChangeEvent<HTMLInputElement>) {
        const [file]: FileList = ev.target.files!
        const reader = new FileReader();

        reader.readAsArrayBuffer(file);

        reader.onload = (evt: ProgressEvent<FileReader>) => {
            decodeAudioData(evt.target?.result as ArrayBuffer).then(buffer => {
                const newBuffer = clipBuffer(buffer, 50,70)
                willDrawWave(newBuffer)
                createGraph(newBuffer)
            })
        }
    }

    function decodeAudioData(encodedBuffer: ArrayBuffer): Promise<AudioBuffer> {
        const audioContext = new AudioContext()

        return audioContext.decodeAudioData(encodedBuffer)
    }

    function getPeaks(buffer: AudioBuffer, perSecPx: number): number[] {
        const { sampleRate, length } = buffer
        // 每一份有多少个点
        const size = Math.floor(sampleRate / perSecPx);
        // 总的份数
        const segment = Math.floor(length / size);

        const point: number[] = []
        // 取左通道
        const leftChannel = buffer.getChannelData(0)
        for(let i = 0; i < segment; i++) {
            const start = i * size

            let min = 0
            let max = 0

            for(let j = start; j < start + size; j++) {
                const value = leftChannel[j]

                if (max < value) {
                    max = value
                }

                if (min > value) {
                    min = value
                }
            }

            point.push(min, max)
        }

        return point
    }

    function clipBuffer(buffer: AudioBuffer, start: number, end: number): AudioBuffer {
        const { numberOfChannels, sampleRate } = buffer
        const dur = end - start;

        const offAudioContext = new OfflineAudioContext(numberOfChannels, dur * sampleRate, sampleRate)
        const cutBuffer = offAudioContext.createBuffer(numberOfChannels, dur * sampleRate, sampleRate)

        for (let i = 0 ; i < numberOfChannels; i++) {
            const originalChannelData = buffer.getChannelData(i)
            const cutChannelData = cutBuffer.getChannelData(i)
            
            const feg = originalChannelData.subarray(start * sampleRate, end * sampleRate)
            cutChannelData.set(feg)
        }

        return cutBuffer
    }

    function createGraph(buffer: AudioBuffer) {
        const audioContext = new AudioContext()
        
        const song = audioContext.createBufferSource()
        song.buffer = buffer
        song.connect(audioContext.destination)
        const btn = document.querySelector('#btn')!
        btn.addEventListener('click', () => {
            song.start()
        }, false)

        setLoading(false)
    }

    function willDrawWave(buffer: AudioBuffer) {
        // 每一秒钟取10份
        const perSecPx: number = 10
        const values = getPeaks(buffer, perSecPx)
        drawWave(values)
    }

    function drawWave(peaks: number[]) {
        const canvas = document.querySelector('canvas')!
        const context = canvas.getContext('2d')!
        const silceW = canvas.width / peaks.length
        const p = canvas.height / 2
        context.save()
        context.lineWidth = 1
        context.fillStyle = '#000'
        context.translate(0, p)
        for (let i = 0; i < peaks.length; i++) {
            const value = peaks[i] * p
            if (i === 0) {
                context.moveTo(i * silceW, value)
            } else {
                context.lineTo(i * silceW, value)
            }
        }
        context.stroke()
        context.restore()
    }

    return (
    <div>
        <div>
            <input type="file" onChange={onUpload} accept="audio/*"/>
        </div>
        {!loading && 
        <span>完成</span>
        }
        <div>
            <button id="btn">play</button>
        </div>
        <canvas width={900} height={100}/>
    </div>
    )
}