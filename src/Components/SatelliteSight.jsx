import React, { useCallback, useEffect, useRef } from 'react';

const SatelliteSight = ({ azimuth, elevation }) => {
    const canvasRef = useRef(null);

    const azel_to_xy = (centerX, centerY, radius, azimuth, elevation) => {
        // Convert to radian
        const az = azimuth * Math.PI / 180;
        const el = elevation * Math.PI / 180;

        const rel = radius - (2 * radius * el) / Math.PI;

        // Compute X and Y positions
        const x = centerX + rel * Math.sin(az);
        const y = centerY - rel * Math.cos(az);

        return {
            x,
            y
        }
    };
    
    const draw = useCallback(
        /**
         * @param {HTMLCanvasElement} canvas
         */ 
        (canvas) => {
            const ctx = canvas.getContext('2d');
            ctx.font = '12px sans-serif';
            const height = canvas.getBoundingClientRect().height;
            const width = canvas.getBoundingClientRect().width;
            const centerX = canvas.getBoundingClientRect().width / 2;
            const centerY = canvas.getBoundingClientRect().height / 2;
            const offset = 15;
            const circleRadius = width / 2 - offset;

            const { x, y } = azel_to_xy(centerX, centerY, circleRadius, azimuth, elevation);

            ctx.clearRect(0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);

            ctx.strokeStyle = '#00000066'

            ctx.beginPath();
            ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(centerX, centerY, width / 3.3, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(centerX, centerY, width / 6.6, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(centerX, offset);
            ctx.lineTo(centerX, height - offset);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(15, centerY);
            ctx.lineTo(width - offset, centerY);
            ctx.stroke();
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.fillText('N', centerX - 4, offset - 5);
            ctx.beginPath();
            ctx.fillText('S', centerX - 4, height - 1);
            ctx.beginPath();
            ctx.fillText('E', width - offset + 5, centerY + 4);
            ctx.beginPath();
            ctx.fillText('W', 0, centerY + 4);
            ctx.fillStyle = '#FF9900';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
    }, [azimuth, elevation]);

    useEffect(() => {
        if(canvasRef.current)
        {
            draw(canvasRef.current);
        }
    }, [canvasRef]);

    return (
        <div className="w-100">
            <canvas className="mb-3" height="300" width="300" ref={canvasRef} />
        </div>
    );
};

export default SatelliteSight;