import React, { useEffect, useRef } from 'react';

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

const ImageClassifier = () => {
    let net;
    // DOM에 직접 접근해야 하므로, useState가 아닌, Ref로
    const camera = useRef<any>(null);
    const figures = useRef<any>(null);

    const run = async () => {
        await tf.setBackend('webgl');

        net = await mobilenet.load();

        const webcam = await tf.data.webcam(camera.current, {
            resizeWidth: 870,
            resizeHeight: 534,
        })

        while (true) {
            const img = await webcam.capture();
            const result = await net.classify(img);

            if (figures.current) {
                figures.current.innerText = `prediction : ${result[0].className} \n probability: ${result[0].probability}`
            }

            img.dispose();

            await tf.nextFrame();
        }
    };

    // const handleSuccess = (stream: any) => {
    //     camera.current.srcObject = stream;
    //   };

    useEffect(() => {
        // navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);
        run()
    }, [])

    return (
        <>
            <div ref={figures} />
            <video
                ref={camera}
                muted={true}
                width="870"
                height="534"
                autoPlay
                playsInline
                 
            />
        </>
    )
}

export default ImageClassifier