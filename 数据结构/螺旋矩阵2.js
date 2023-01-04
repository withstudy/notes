// 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
//
// 示例:
//
//     输入: 3 输出:
//     [
//     [ 1, 2, 3 ],
//     [ 8, 9, 4 ],
//     [ 7, 6, 5 ]
//     ]

function fn(n){
    let startX=0,startY=0;
    let offset = 1,count = 1;
    const res = new Array(n).fill(0).map(() => new Array(n))
    let loop = Math.floor(n/2);
    let mid = loop;
    while (loop--){
        let col=startY;
        let row=startX;
        for( ;col<startY+n-offset;col++){
            res[row][col] = count ++;
        }

        for(;row<startX+n-offset;row++){
            res[row][col] = count ++;
        }

        for(;col>startY;col--){
            res[row][col] = count ++;
        }

        for(;row>startX;row--){
            res[row][col] = count ++;
        }

        startY ++;
        startX ++;
        offset += 2;
    }
    if(n%2 !== 0){
        res[mid][mid] = count;
    }
    return res;
}

console.log(fn(5));
