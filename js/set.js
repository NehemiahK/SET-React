var shapeArr = [];
var shadeArr =[];
var colorArr =[];
var numberArr =[];

var arrArrs= [shapeArr,shadeArr,colorArr,numberArr];

function checkAll(array){
    //console.log('running check all');
    for (var i=0; i<array.length;i++){
        //console.log('inside for loop');
        if (checkMatch(array[i]) == false){
            return false;
        }
    }
    return true;
}

function checkMatch(array){
    if (array[0] == array[1] && array[0] == array[2]){
        return true;
    }
    else if( (array[0] !== array[1]) && (array[1] !== array[2]) && (array[0] !== array[2]) ){
        return true;
    }
    return false;
}

class Card extends React.Component{ // define the component
    constructor(props){
        super(props);
        this.test = this.test.bind(this);
    }
    test(){

        this.img.setAttribute('class', 'selected');
        shapeArr.push(this.props.shape);
        shadeArr.push(this.props.shading);
        colorArr.push(this.props.color);
        numberArr.push(this.props.number);

        console.log(shapeArr,shadeArr,colorArr,numberArr);

        if (shapeArr.length==3){
            var match = checkAll(arrArrs);
            //console.log(match);

            if (match == true){
                alert('its a match');
            }
            else{
                alert('THIS ISNT A MATCH!');
            }
        }

    }
    render(){
        return (
            <div>
                <img onClick={this.test} ref={(img) => { this.img = img; }} src={this.props.pic} />
            </div>
        );
    }
}

class SetCard{
    constructor(number,picture,color,shape,shading,amount){
        this._number = number;
        this._picture = picture;
        this._color = color;
        this._shape = shape;
        this._shading = shading;
        this._amount = amount;
    }
    get number(){
        return this._number;
    }
    get picture(){
        return this._picture;
    }
    get color(){
        return this._color;
    }
    get shape(){
        return this._shape;
    }
    get shading(){
        return this._shading;
    }
    get amount(){
        return this._amount;
    }
}


class App extends React.Component{
    render(){
        var cards =  [];
        var url = 'https://puzzles.setgame.com/images/setcards/small/';
        var passedNine = 1;
        var colors = ['red','purple','green'];
        var currColorIndex = 0;

        for (var i=1; i<=81; i++){
            var color, shape, shading,number;



            if (i>=1 && i<=27){
                shading = 'solid';
            }
            else if (i>=28 && i<=54){
                shading = 'shaded';
            }
            else if (i>=55 && i<=81){
                shading = 'transparent';
            }

            if (i%9==0){
                passedNine +=1;
            }

            if (passedNine == 1 || passedNine == 4 || passedNine == 7){
                shape = 'squiggle';
            }
            else if (passedNine == 2 || passedNine == 5 || passedNine == 8){
                shape = 'diamond';
            }
            else if (passedNine == 3 || passedNine == 6 || passedNine == 9){
                shape = 'oval';
            }
            color = colors[currColorIndex];

            if (i%3==0){
                if (currColorIndex==2){
                    currColorIndex= 0;
                }
                else{
                    currColorIndex +=1;
                }
            }

            if(i%3==0){
                number = '3';
            }
            else if(i%3==1){
                number = '1';
            }
            else if(i%3==2){
                number = '2';
            }


            var num = i < 10 ? '0' + i : i;
            var setcard = url + num + '.gif';
            var temp = new SetCard(i,setcard,color,shape,shading,number);

            cards.push(temp);
        }

        var cards = cards.map(
            x=> <Card key={`item${x.number}`} pic ={x.picture} color={x.color}
                shape={x.shape} shading={x.shading} number={x.amount}></Card>);

        function shuffle(array) {
            let counter = array.length;

        // While there are elements in the array
            while (counter > 0) {
            // Pick a random index
                let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
                counter--;

            // And swap the last element with it
                let temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
        }
        return array;
    }
    cards = shuffle(cards);

    cards = cards.slice(0,12);
        return (
            <div>
                {cards}
            </div>
        );
    }
}


ReactDOM.render(
    <App/>, // name of component
    document.getElementById('root') // where the component should go in the dom
);
