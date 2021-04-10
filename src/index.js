
calculatePivotPoints(3.5699, 3.1394, 3.5).then(logPivotPoints);

function logPivotPoints(pivotPoints) {
    const { r2, r1, pivot, s1, s2 } = pivotPoints;

    console.log(`R2:${r2?.toFixed(3)}`);
    console.log(`R1:${r1?.toFixed(3)}`);
    console.log(`Pivot:${pivot?.toFixed(3)}`);
    console.log(`S1:${s1?.toFixed(3)}`);
    console.log(`S2:${s2?.toFixed(3)}`);
}

function calculatePivotPoints(previousHigh, previousLow, previousClose) {
    return new Promise((resolve, reject) => {
        pivotPoint(previousHigh, previousLow, previousClose).then((pivot) => {
            Promise.all([
                r2(pivot, previousHigh, previousLow),
                r1(pivot, previousLow),
                s1(pivot, previousHigh),
                s2(pivot, previousHigh, previousLow)
            ]).then(([r2, r1, s1, s2]) => {
                const pivotPoints = { r2, r1, pivot, s1, s2 };
                resolve(pivotPoints);
            });
        })
    });

}


function pivotPoint(previousHigh, previousLow, previousClose) {
    return new Promise((resolve, reject) => {
        resolve((previousHigh + previousLow + previousClose) / 3);
    });
}

function srFirst(pivot, previousSomething) {
    return new Promise((resolve, reject) => {
        resolve((pivot * 2) - previousSomething);
    });
}

function s2(pivot, previousHigh, previousLow) {
    return new Promise((resolve, reject) => {
        resolve(pivot - (previousHigh - previousLow));
    });

}

function s1(pivot, previousHigh) {
    return srFirst(pivot, previousHigh);
}


function r1(pivot, previousLow) {
    return srFirst(pivot, previousLow);
}

function r2(pivot, previousHigh, previousLow) {
    return new Promise((resolve, reject) => {
        resolve(pivot + (previousHigh - previousLow));
    });
}


