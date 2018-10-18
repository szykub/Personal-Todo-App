export const sortArray = (array) => {

    let compare = (a, b) => {
        let bufor = 0;

        if(a.highPriority){
            bufor = -1          
            return bufor  
        }else if(b.highPriority){
            bufor = 1;
            return bufor
        }else{
            return new Date(a.expires) - new Date(b.expires);
        }
    }

    return array.sort(compare)
}