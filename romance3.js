/*------------Fullstack Academy Prep Romance Project: Cleo
  parseText function:
    takes in a string and returns an array of arrays of the words with punctuations and words without punctuations except apostrophes
        1.obtain a copy of string in all lowercase 
        2.split the string and store it in a new array with punctuations
        3.use map on the above array to generate an array with no punctuations
        4.return an array that contains the above two arrays
                                                                        -------------*/
function parseText(text, arr){
    var textCopy = text.toLowerCase();
    var arrLower = textCopy.split(' ');
    var punctuations = ',.!;?';
    var arrNoPunctuation = arrLower.map(function(word){
                                                        if(punctuations.indexOf(word[word.length-1])>=0){
                                                          return word.slice(0, -1);
                                                        }
                                                        return word;
                                        });
    return [arrLower, arrNoPunctuation]; 
}
/*------------
  generateWordPairs function:
    takes in a string and returns an object of word pairs with values in the form of an array (1 level)
        1. use parseText function to generate an array of words
        2. loop through the array and create an object using array elements as keys and the element immediately following key element on the array list as its value
        3. return the object
    updated to also take in both strings and an array of strings
        the above steps becomes a helper function
    every key has arrays of values that can have combination of two or more words phrases
                                                                        -------------*/
// function generateWordPairs(wordCorpus){
      
//     var objOfWordCorpus = {};

//     if(Array.isArray(wordCorpus)){
//       wordCorpus.forEach(function(eachWordCorpus){
//                                                     helperPairs(eachWordCorpus);
//                          })
//     }else{
//       helperPairs(wordCorpus);
//     }

//     function helperPairs(wordCorpus){
//       var arrOfWordCorpus = parseText(wordCorpus);
//       var noPuncArr = arrOfWordCorpus[1];
//       var withPuncArr = arrOfWordCorpus[0];
//       noPuncArr.slice(0,-1).forEach(function(word, i){
//                                               var nextWord = noPuncArr[i+1];
//                                               var nextWordPunc = withPuncArr[i+1];

//                                               objOfWordCorpus.hasOwnProperty(word) ? objOfWordCorpus[word].push(nextWord): objOfWordCorpus[word] = [nextWord];
//                                               if(nextWord !== nextWordPunc) objOfWordCorpus[word].push(nextWordPunc);
//                               })                        
//     } 
                             
//     return objOfWordCorpus;
// }

function generateWordPairs(wordCorpus){
      
    var objOfWordCorpus = {};

    if(Array.isArray(wordCorpus)){
      wordCorpus.forEach(function(eachWordCorpus){
                                                    helperPairs(eachWordCorpus);
                         })
    }else{
      helperPairs(wordCorpus);
    }

    function helperPairs(wordCorpus){
      var arrOfWordCorpus = parseText(wordCorpus);
      var noPuncArr = arrOfWordCorpus[1];
      var withPuncArr = arrOfWordCorpus[0];
      noPuncArr.slice(0,-1).forEach(function(word, i){
                                              var nextWord = noPuncArr[i+1];
                                              var nextNextWord = noPuncArr[i+2];
                                              var nnnWord = noPuncArr[i+3];
                                              var nnnnWord = noPuncArr[i+4];
                                              var nextWordPunc = withPuncArr[i+1];

                                              //objOfWordCorpus.hasOwnProperty(word) ? (nextWord === nextWordPunc ? objOfWordCorpus[word].push(nextWord+' '+nextNextWord): objOfWordCorpus[word].push(nextWord))
                                                                                    // : objOfWordCorpus[word] = [nextWord];
                                              if(objOfWordCorpus.hasOwnProperty(word)){
                                                if(i < noPuncArr.length-4){
                                                  objOfWordCorpus[word].push(nextWord);
                                                  objOfWordCorpus[word].push(nextWord+' '+nextNextWord);
                                                  objOfWordCorpus[word].push(nextWord+' '+nextNextWord + ' ' + nnnWord);
                                                  objOfWordCorpus[word].push(nextWord+' '+nextNextWord + ' ' + nnnWord + ' ' + nnnnWord);
                                                }
                                                else if(i < noPuncArr.length-3){
                                                  objOfWordCorpus[word].push(nextWord+' '+nextNextWord);
                                                  objOfWordCorpus[word].push(nextWord+' '+nextNextWord + ' ' + nnnWord);
                                                }else{
                                                  objOfWordCorpus[word].push(nextWord);
                                                }
                                              }else{
                                                objOfWordCorpus[word] = [nextWord];
                                              }
                                              if(nextWord !== nextWordPunc) objOfWordCorpus[word].push(nextWordPunc);
                              })                        
    } 
    //console.log(objOfWordCorpus);                         
    return objOfWordCorpus;
}
/*------------
  writeLine function:
    takes in a Markov Chain object and a number specifying the words per line and return a string of words
        1. create a function for generating random number based on a specified range
        2. create a random key
        3. get a random value for the key
        4. use the random value as the next key for generating the next random value, if it isn't a key in object generate another random key
        5. return the final string with the specified word length
    updated to accept two or more word phrase as a match
                                                                        -------------*/
function writeLine(obj, numPerLine){
    var resLine = '';
    var obKeys = [];
    for(var key in obj){
        obKeys.push(key);
    }
    
    for(var i = 0; i < numPerLine; i++){
      if(i === 0) var ranKey = obKeys[randomNum(obKeys.length-1)];
      var nextWord = helperWordMatch(ranKey);
      var temp = nextWord.split(' ');
      var countWords = temp.length;

      if(nextWord && nextWord!==ranKey){
            i === 0 ? resLine += ranKey + ' ' + nextWord + ' ': i < numPerLine -1 ?
                                                                                    resLine += nextWord + ' ' : resLine += nextWord;
            nextWord.indexOf(' ')>=0 ? ranKey = nextWord.slice(nextWord.lastIndexOf(' ')+1):ranKey = nextWord;

            if(countWords > 1){
              i = i - 1 + countWords;
            } 
      }else{
            ranKey = obKeys[randomNum(obKeys.length-1)];
            if(i === 0){
              i--;
            }else {
              if(ranKey !== resLine.slice(-(ranKey.length+1), -1)){
                i < numPerLine - 1 ? resLine += ranKey + ' ' : resLine += ranKey;
              }else{
                //ranKey = nextWord;
                nextWord.indexOf(' ')>=0 ? ranKey = nextWord.slice(nextWord.lastIndexOf(' ')+1):ranKey = nextWord;
                i = i + 1 - countWords;
              }
            }
      } 
    }

    function helperWordMatch(word){

        var matchWord;

        if(obj.hasOwnProperty(word)){
          var currentObj = obj[word];
          currentObj.length > 1 ? matchWord = currentObj[randomNum(currentObj.length-1)]:matchWord = currentObj[0];
        }else{
            return '';
        }
        return matchWord;
    }

    return resLine;
}
/*------------
  generatePoem function:
    wordCopus can be an array of strings or a string
    numLines specifies the number of lines the poem will have
    wordsCountList is an array of numbers to control the number of word count in each line
    1. generate a one level object with the word pairs using the generateWordPairs function
    2. do a for loop to create lines of texts using writeLine function and add it to the final poem string
    3. change the letter following a period and the word I to Uppercase
    functions used: generateWordPairs, randomNum, writeLine
    returns a string
                                                                        -------------*/
function generatePoem(wordCorpus, numLines, wordsCountList){
    var resPoem = '';
    var wordsPerLine;
    var corpusObj = generateWordPairs(wordCorpus);
    for(var i = 0; i < numLines; i++){ 
        if(arguments.length > 3 && wordsCountList[i]){
            wordsPerLine = wordsCountList[i];
        }else{
            wordsPerLine = randomNum(7) + 3;
        }
        var line = writeLine(corpusObj, wordsPerLine);
        resPoem += line + ' <br> ';       
    }

    function uppercase(str){
      var arrS = str.split(' ');
      arrS.forEach(function(word, i){
                                    if(word === 'i'){
                                      arrS[i] = 'I';
                                    }else if(word.slice(0, 2) === "i'"){
                                      arrS[i] = "I'" + word.slice(2);
                                    }else if(word[word.length-1] === '.' && i < arrS.length - 2){
                                      if(i < arrS.length - 3 && arrS[i+1] === '<br>'){
                                        arrS[i+2] = arrS[i+2][0].toUpperCase() + arrS[i+2].slice(1);
                                      }else{
                                        arrS[i+1] = arrS[i+1][0].toUpperCase() + arrS[i+1].slice(1);
                                      }
                                    }
                   })
     str = arrS.join(' ');
     str = str[0].toUpperCase() + str.slice(1);
     return str;
    }

    resPoem = uppercase(resPoem);
    return resPoem;
}
/*------------
  randomNum function:
    returns a random integer between 0 and range.
                                      -------------*/
function randomNum(range){
    return Math.round(Math.random()*range);
}



/*------------
  Setting up HTML content
    maybe quotes will give good word pairs
    set up few arrays of string on the following topics: romance, philosophy, science
    have lines of text generated from individual arrays or a mixed arrays from the above topics.
                                                                                               -------------*/
var quotesR = ["No matter what has happened. No matter what you've done. No matter what you will do. I will always love you. I swear it.", 
              "I wanted to tell you that wherever I am, whatever happens, I'll always think of you, and the time we spent together, as my happiest time. I'd do it all over again, if I had the choice. No regrets.",
              "It's one thing to fall in love. It's another to feel someone else fall in love with you, and to feel a responsibility toward that love.",
              "I never loved you any more than I do, right this second. And I'll never love you any less than I do, right this second.", 
              "Sometimes I can't see myself when I'm with you. I can only just see you.",
              "I love you. Remember. They cannot take it.",
              "If my love were an ocean, there would be no more land. If my love were a desert, you would see only sand. If my love were a star-late at night, only light. And if my love could grow wings, I'd be soaring in flight.",
              "There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment."
              ]
var quotesP = ["The only thing I know is that I know nothing.", 
              "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
              "It is strange that only extraordinary men make the discoveries, which later appear so easy and simple.",
              "There may be babblers, wholly ignorant of mathematics, who dare to condemn my hypothesis, upon the authority of some part of the Bible twisted to suit their purpose. I value them not, and scorn their unfounded judgment.",
              "We pass through this world but once. Few tragedies can be more extensive than the stunting of life, few injustices deeper than the denial of an opportunity to strive or even to hope, by a limit imposed from without, but falsely identified as lying within.",
              "Falsity in intellectual action is intellectual immorality.",
              "The saddest aspect of life right now is that gathers knowledge faster than society gathers wisdom.",
              "You cannot teach a man anything; you can only help him discover it in himself."
              ] 
var quotesS = ["I seem to have been only like a boy playing on the seashore, and diverting myself in now and then finding a smoother pebble or a prettier shell than ordinary, whilst the great ocean of truth lay all undiscovered before me.",
               "Life cannot have had a random beginning ... The trouble is that there are about 2000 enzymes, and the chance of obtaining them all in a random trial is only one part in 10^40,000, an outrageously small probability that could not be faced even if the whole universe consisted of organic soup.",
               "The black holes of nature are the most perfect macroscopic objects there are in the universe: the only elements in their construction are our concepts of space and time.",
               "The good thing about science is that it's true whether or not you believe in it.",
               "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
               "Shall I refuse my dinner because I do not fully understand the process of digestion?",
               "If I have seen further it is by standing on the shoulders of Giants.",
               "Equipped with his five senses, man explores the universe around him and calls the adventure Science.",
               "One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don't throw it away."
              ]
var quote = quotesP.concat(quotesR).concat(quotesS);             

function inputGen(topic='quotesP'){
  var str = '<table>';

  if(topic.id === 'quotesR'){
    str += '<tr><th onclick=start(quotesR) id=start>Start</th></tr>';
    quotesR.forEach(function(ele){
      str += '<tr><td class=quote>'+ ele + '</td></tr>';
    })
  }else if(topic.id === 'quotesP'){
    str += '<tr><th onclick=start(quotesP) id=start>Start</th></tr>';
    quotesP.forEach(function(ele){
      str += '<tr><td class=quote>'+ ele + '</td></tr>';
    })
  }else if(topic.id === 'quotesS'){
    str += '<tr><th onclick=start(quotesS) id=start>Start</th></tr>';
    quotesS.forEach(function(ele){
      str += '<tr><td class=quote>'+ ele + '</td></tr>';
    })
  }else{
    str += '<tr><th onclick=start(quote) id=start>Start</th></tr>';
    quote.forEach(function(ele){
      str += '<tr><td class=quote>'+ ele + '</td></tr>';
    })
  }
  str += '</table>';
  
  document.getElementById('inputSourceText').innerHTML = str;
}

function start(arr){
    var linesCount = randomNum(6) + 5;
    var poem = generatePoem(arr, linesCount);
    document.getElementById('poemDisplay').innerHTML = poem;
    document.getElementById('start').innerHTML = 'Another One';
}








