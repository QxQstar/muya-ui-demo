import React, { useEffect } from 'react'

let playing = false
let id: number;
export default function AudioTest() {

    useEffect(() => {
       const audioContext = new AudioContext()
       const audioElement = document.querySelector('audio')!

       const gainNode = audioContext.createGain()
       const panner = new StereoPannerNode(audioContext, {
           pan: 0
       })
       const analyser = audioContext.createAnalyser()

        const track = audioContext.createMediaElementSource(audioElement)
        track.connect(gainNode).connect(panner).connect(analyser).connect(audioContext.destination)
        analyser.fftSize = 256;
        function onClick() {
            if (audioContext.state === "suspended") {
                audioContext.resume()
            }

            if (playing) {
                playing = false
                audioElement.pause()
                cancelAnimationFrame(id)
            } else {
                run()
                playing = true
                audioElement.play()
            }
        }

        function onChangeVolume() {
            gainNode.gain.value = parseFloat(volumeElement.value)
        }

        function onChangePanner() {
            panner.pan.value = parseFloat(pannerElement.value)
        }

        const statusElement = document.querySelector('#status') as HTMLButtonElement
        statusElement.addEventListener('click', onClick, false)

        const volumeElement = document.querySelector('#volume') as HTMLInputElement
        volumeElement.addEventListener('input', onChangeVolume, false)

        const pannerElement = document.querySelector('#panner') as HTMLInputElement
        pannerElement.addEventListener('input', onChangePanner, false)

        const canvas1 = document.querySelector('#canvas1') as HTMLCanvasElement
        const context1 = canvas1.getContext('2d')!
        const width1 = canvas1.width
        const height1 = canvas1.height

        const canvas2 = document.querySelector('#canvas2') as HTMLCanvasElement
        const context2 = canvas2.getContext('2d')!
        const width2 = canvas2.width
        const height2 = canvas2.height
        
        function run() {
            const dataArrFrequency = new Uint8Array(analyser.frequencyBinCount)
            const dataTimeDomain = new Uint8Array(analyser.frequencyBinCount)

            analyser.getByteFrequencyData(dataArrFrequency)
            analyser.getByteTimeDomainData(dataTimeDomain)

            drawFrequency(dataArrFrequency)
            drawTimeDoamin(dataTimeDomain)

            id = requestAnimationFrame(run)
        }

        function drawFrequency(data: Uint8Array) {
            context1.clearRect(0, 0, width1, height1)
            const len = data.length
            const barW = width1 / len

            for(let i = 0; i < len; i++) {
                const barH = (data[i] / 255) * height1
                context1.beginPath()
                const r = barH + 25 * (i / len)
                const g = 250 * (i / len)
                const b = 50
                context1.fillStyle = `rgb(${r},${g},${b})`

                context1.fillRect(i * barW, height1 - barH, barW, barH)
            }
        }

        function drawTimeDoamin(data: Uint8Array) {
            context2.clearRect(0, 0, width2, height2)
            context2.beginPath()
            const len = data.length
            const sliceW = width2 / len

            context2.fillStyle = '#000'
            context2.lineWidth = 2
            for(let i = 0; i < len; i++) {
                const y = (data[i] / 128) * height2/2
                if (i === 0) {
                    context2.moveTo(0, y)
                } else {
                    context2.lineTo(i * sliceW, y)
                }
            }

            context2.stroke()
        }

        return () => {
            statusElement.removeEventListener('click', onClick, false)
            volumeElement.removeEventListener('input', onChangeVolume, false)
            pannerElement.removeEventListener('input', onChangePanner, false)
        }
    }, []);

    return (
        <div>
            <audio 
                src='/music.mp3' 
                loop={true}
                crossOrigin="anonymous"
            />
            <button id="status">on/off</button>
            音量：<input 
                type="range" 
                id="volume" 
                min="0" 
                max="2" 
                defaultValue="1"
                step="0.01"
            />

            立体声：<input 
                type="range" 
                id="panner" 
                min="-1" 
                max="1" 
                defaultValue="0"
                step="0.01"
            />
            <div style={{marginTop: '20px'}}>
                <canvas width="700" height="100" id="canvas1"/>
            </div>

            <div style={{marginTop: '20px'}}>
                <canvas width="700" height="100" id="canvas2"/>
            </div>
        </div>
    )
}