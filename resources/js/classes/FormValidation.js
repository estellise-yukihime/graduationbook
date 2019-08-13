
// var result = {
//     value: false,
//     message: ""
// }

export function alphaString(string, regexp){

    if(!string.match(regexp)){
        return true;
    }

    return false;

}

export function lesserThan(condition1, condition2){

    let result = false;

    if(condition1 < condition2){
        result = true;
    }

    return result;

}

export function greaterThan(condition1, condition2){

    let result = false;

    if(condition1 > condition2){
        result = true;
    }
    return result;
}

export function isEmpty(condition1, condition2){

    let result = false;

    if(condition1 === condition2){
        result = true;
    }

    return result;
}

export function notEqual(condition1, condition2){
    let result = false;

    if(condition1 !== condition2){
        result = true;
    }

    return result;
}

export default class Validation{

    constructor(name, messages){

        let index = 0;

        this.details = {
            error: false,
            messages: []
        };

        this.setIndex = function(newIndex){
            index = newIndex;
        };

        this.getIndex = function(){
            return index;
        };

        this.name = name;
        this.messages = messages;// = name.charAt(0).toUpperCase() + name.slice(1) + " ";
    }

    validate(condition1, condition2, operator){

        let result = operator(condition1, condition2);

        if(result){
            this.details.error = true;
            if(!this.details.messages.includes(this.messages[this.getIndex()])){
                this.details.messages.push(this.messages[this.getIndex()]);
            }
        }
        else{
            let removeMessage = this.messages[this.getIndex()];
            this.details.messages.filter(function(value, index){
                return value != removeMessage;
            });

            if(this.details.messages.length <= 0){
                this.details.error = false;
            }
        }

    }

    result(){
        return this.details;
    }

}