/***************************************************************
*
*	Title: Simple Word Game (words falling out of the sky!)
*   Created by : Michael Choi
*   Place: CodingDojo
*	Date: September 2013
*
****************************************************************/

function PlayGround(selector, selector_word, selector_score)
{
	this.canvas = document.getElementById(selector);
	this.selector_word = selector_word;		//stores the id of the input where the user can type the word
	this.selector_score = selector_score;	//stores the id of the div where the score is stored

	console.log(this.canvas);
	this.words = [];
	
	this.score = 0;		//stores the user score
	this.counter = 0;	//counts the number of words created

	this.playGame = function()
	{
		this.fallWords();				//make all the words fall down
		this.createWord();				//create a new word
		this.updateWordPositions();		//update where the words are displayed
	}

	//check whether any of the words matched the typed word by the user
	this.checkWord = function(typed)
	{
		ini_score = this.score;
		for(i in this.words)
		{
			if(this.words[i].word == typed)
			{
				console.log('#word_' + this.words[i].id);
				$('#word_' + this.words[i].id).remove();
				this.score = this.score + 50;
			}
		}

		if(ini_score != this.score)
		{
			$('#'+this.selector_word).val('');
			$('#'+this.selector_score).text(this.score);
		}
	}
	//create a new Word and add the Word into the canvas
	this.createWord = function()
	{
		this.counter++;

		//create a new word between 0 and max_x
		var newWord = new Word(this.counter);
		newWord.createRandomWordsBetween(0, 500);

		//store this new word into words array
		this.words.push(newWord);
		
		//insert this new word in the HTML
		this.canvas.innerHTML = this.canvas.innerHTML + "<div id='word_"+(newWord.id)+"'><div style='position:absolute; left:"+newWord.x+"px; top:"+newWord.y+"px'>"+newWord.word+"</div></div>";
	}

	this.fallWords = function()
	{
		for(var i=this.words.length-1; i>=0; i--)
		{
			this.words[i].y = this.words[i].y + 15;	

			if(this.words[i].y > 385)
			{
				$('#word_' + this.words[i].id).remove();		//remove the word from html
				if(this.words[i].word != '')					//penalize the user but only if the word is not empty
					this.score = this.score - 100;
				
				$('#'+this.selector_score).text(this.score);
				this.words.shift();								//remove the last item in the array
			}
		}
	}

	this.updateWordPositions = function()
	{
		for(i in this.words)
		{
			loc = document.getElementById('word_'+this.words[i].id);
			if(loc) loc.innerHTML = "<div style='position:absolute; left:"+this.words[i].x+"px; top:"+this.words[i].y+"px'>"+this.words[i].word+"</div>";
		}
	}
}


function Word(id)
{
	var words = ["Coding", "Dojo", "awesome", "rocks", "amazing"];
	this.x = 0;
	this.y = 0;
	this.id = id;

	this.createRandomWordsBetween = function(x_min, x_max)
	{
		random_index = parseInt(Math.random()*words.length);
		this.word = words[random_index];
		random_x_index = parseInt(Math.random()*(x_max-x_min-words.length*15));
		this.x = x_min + random_x_index;
	}
}