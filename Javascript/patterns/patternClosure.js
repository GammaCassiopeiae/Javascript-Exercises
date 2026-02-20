
function funcClosure(){
    let num=0;
    for(let i=0;i<4;i++){
    num += i;
        for(let j=0;j<4;j++){
           num += j;
            for(let k=0;k<4;k++){
            num += k;
                 for(let l=0;l<4;l++){
                    l = l+num;
                    console.log("l = ", l, "::");
                 }

            }
        }

    }
}
funcClosure();