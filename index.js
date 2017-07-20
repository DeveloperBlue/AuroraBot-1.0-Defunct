const Discord = require('discord.js');
const client = new Discord.Client();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MODULES /////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const os = require('os');
const util = require("util");
const child_process = require('child_process');
const exec = require('child_process').exec;
	var itemIdDir = "C:/Users/Mike/Desktop/Unturned Server/Bundles/Items";
	var vehicleIdDir = "C:/Users/Mike/Desktop/Unturned Server/Bundles/Vehicles";

const ps = require('ps-node');
const http = require('follow-redirects').http;
const https = require('follow-redirects').https;
const xml2jsParse = require('xml2js').parseString;

const google = require('google');
	google.resultsPerPage = 4;

const GoogleImages = require('google-images');
	var cseId = "011296045580721392230:paodmohxm6c";
	var cseAPIKey = "AIzaSyAa4nk1Ej-yVFtUqIrH3iUrQa8r9CJgJZQ";

const gImagesClient = new GoogleImages(cseId, cseAPIKey);
	var isSafeSearchOn = true;

const randomPuppy = require('random-puppy');
const yahooWeather = require('yql');
const mcping = require('mc-ping-updated');

const dateTime = require('node-datetime');
const schedule = require('node-schedule');
const archiver = require('archiver');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PREFERENCES /////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


let prefix = "!";

function shipCommands(location)
{
location.send("\n \ Hey there! I'm AuroraBot! \n\
Prefix: **" + prefix + "** \n \
```\n To use a command, simply type " + prefix + " before your command. Example: '" + prefix + "cmds' ```\n \
");
location.send("\n \
\n Commands\n ``` \
HELPFUL \n \
commands (cmds/help) ['optional here'] - Gets all documented commands in your inbox. Optional 'here' parameter posts the commands in the channel \n \
ping - Gets your latency to the server in ms \n age - Get the exact time your discord account was created and when you joined the server\n \
servers - Check if the Unturned and Minecraft servers are running \n \
checkmem - Check the RAM usage of the desktop server \n \
purge ['amount'] - Delete the last amount number of messages the same text channel. You must have a role Admin to use this \n \
domath ['equation'] - Make WolframAlpha solve your equation \n \
\n \
FUN \n \
roll [('optional min no';) 'optional max no.'] - Roll a pair of dice between 1 and your optional maximum number or between a set minimum and maximum. Default is out of 10 \n \
8ball ['optional question'] - Ask the magic 8-ball for an answer! Question after is optional. Returns one of 20 responses \n \
coinflip - Have AuroraBot flip a coin \n \
choose ['choice; choice; choice'] - Have AuroraBot make a selection for you. Choices should be separated by ';'s \n \
cat (kitty) - Get a random cat photo along with a random cat fact \n \
dog (puppy) - Get a random dog photo along with a random dog fact \n \
hated - See who AuroraBot hates \n clearhate - Clear AuroraBot's hate \n \
say ['prompt'] - Have AuroraBot say your prompt! \n \
tts ['prompt'] - Have AuroraBot text-to-speech your prompt! \n \
\n \
SEARCH ENGINES \n \
images ['query'] - Google image search your query \n \
safesearch [optional 'on'/'off'] - Check or toggle safesearch on the " + prefix + "images command \n \
google (search) ['query'] - Google your query. \n \
amazon ['query'] - Search Amazon for your query \n \
youtube ['query'] - Search Youtube for your query \n \
porn ['query'] - Seach a randomized porn site (Pornhub, XVid, RedTube, Motherless) for your query \n \
anime ['query'] - Gets information and watchlinks on an anime with the name of your query. \n \
``` \n \n \
");
location.send("\n \
Alernatively, you can also have a terrible conversation with the bot by @mentioning it! **(Not Available)** \n \
");
}

var unloved;
var maxPurgeLimit = 30;
var coinFlipFailChance = 100;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// METHODS /////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


function parseForQuery(messageStr, prefixArray){
	var query = messageStr;

	for (i = 0; i < prefixArray.length; i++){
		if (query == messageStr){
			var allSplits = messageStr.split(prefixArray[i])
			query = allSplits[1];

			if (allSplits[1] == null){
				query = allSplits[0];
			}

			if (allSplits.length > 2){
				for (var o = 2; o < allSplits.length; o++){
					query += prefixArray[i] + allSplits[o];
				}
			}

		} else {
			break;
		}
	}

	return query.trim();

}

function getMentionsAsString(messageObject){
	var mentions = Array.from(messageObject.mentions.users.values());
	var mentionsStr = "";
	for (i = 0; i = mentions.length - 1; i++){
		console.log(mentions[i]);
		mmentionsStr += "@" + mentions[i] + ", ";
	}
	return mentionsStr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CORE ////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function connect(){
	console.log(`${client.user.username} is online!`);
	client.user.setGame("with your emotions | " + prefix + "cmds");

	startScheduledTasks();
}

client.on('ready', () => {
	connect();
})

client.on('disconnect', () => {
	console.log('AuroraBot was disconnected- Disconnect was successfully detected - will attempt to reconnect.');
	connect();
})

/*
client.on('guildMemberAdd', (guild, member) => {
	if (guild === client.servers.get('id',"SERVERID"))
		client.sendMessage(guild.channels.get('name','general_dead'),"@here, The server welcomes " + member.mention() +"!")
})
*/

client.on('message', (msg) => {

	/*
		Non-prefix commands

	*/

	try {
		var parseMessage = msg.content.toLowerCase();

		if ((parseMessage.replace(/ /g, "") == "noonelovesme") || (parseMessage.replace(/ /g, "") == "nobodylovesme")){

			if (msg.author == unloved){
				msg.reply("This is correct");
			}

			else {
				msg.reply(`I love you!`);
			}

		}
		else if (parseMessage.startsWith("what is love")){
			msg.reply("Baby don't hurt me, don't hurt me, no more!");
		}
		else if ((parseMessage.startsWith("unacceptable")) || (parseMessage.startsWith("this is unacceptable")) || (parseMessage.startsWith("unnacceptable")) || (parseMessage.startsWith("this is unnacceptable"))){

			if (client.user.id == msg.author.id){
				console.log("Picked up a loop - breaking");
				return;
			}

			var unacceptableTextList = ["THIS IS UNACCEPTABLE", "UNACCEPTABLE", "Unacceptable.", "This is UNACCEPTABLE"];
			var unacceptableImgList = [
			"http://s2.quickmeme.com/img/25/25c28c033d3e6c163ff67d3c5abd72dde33bc13e44321242d332b37e68d23284.jpg",
			"https://media0.giphy.com/media/JB8ia4q9sfSDe/200_s.gif", "https://media.giphy.com/media/lSnmXEFSEY2sg/giphy.gif",
			"https://img.memesuper.com/2965a6e6f6ee28111b1d66043be8afbf_lemongrab-lemongrab-unacceptable-meme_625-451.jpeg", "https://i.ytimg.com/vi/DFcKxc7eI88/maxresdefault.jpg"
			];

			msg.channel.send(unacceptableTextList[getRandomInt(0, unacceptableTextList.length)], {tts:true});
			msg.channel.send(unacceptableImgList[getRandomInt(0, unacceptableImgList.length)]);
		}

		/*
			Prefix commands
		*/

		if (!parseMessage.startsWith(prefix)) return;

		console.log( msg.author.username + " said " + msg.content);

		parseMessage = prefix + parseMessage.charAt(1).toLowerCase() + parseMessage.slice(2);

		if ((parseMessage.startsWith(prefix + "commands")) || (parseMessage.startsWith(prefix + "cmds")) || (parseMessage.startsWith(prefix + "help"))){

			var reference = "";

			if (parseMessage.startsWith(prefix + "commands")) {
				reference = "commands";
			} else if (parseMessage.startsWith(prefix + "cmds")) {
				reference = "cmds";
			} else {
				reference = "help";
			}

			var query = parseForQuery(msg.content, [reference]);

			if (query.replace(/ /g, "") == "here"){
				shipCommands(msg.channel);
			}
			else {
				shipCommands(msg.author);
				msg.reply("A list of commands was sent to your inbox!");
			};
		}
		else if (parseMessage == prefix + "ping") {
			var ping = (Math.floor((msg.author.client.ping)*100))/100;
			msg.reply("pong! `" + ping + "ms`");
		}
		else if (parseMessage == prefix + "pong") {
			msg.reply("It's **" + prefix + "ping** you illiterate fuck.");
		}
		else if (parseMessage == prefix + "age"){
			msg.reply(`Here's some neat information . . . \n Your account was created on ${msg.author.createdAt} \n You joined this server on ${msg.member.joinedAt}`);	
		}
		else if ((parseMessage == prefix + "cat") || (parseMessage == prefix + "kitty")) {
			
			var contentOptions = {
				host: "thecatapi.com",
				port: 80,
				path: "/api/images/get?format=xml&results_per_page=1"
			};

			var factOptions = {
				host: "catfacts-api.appspot.com",
				port: 80,
				path: "/api/facts"
			};

			var content = "";
			var fact = "";

			msg.reply("Searching for only the best of cats . . .")
				.then(function(msgBox){

				var contentReq = http.request(contentOptions, function(contentRes) {
					contentRes.setEncoding("utf8");
					contentRes.on("data", function (chunk) {
						content += chunk;
					});

					contentRes.on("end", function () {

						console.log("Querying: " + contentOptions.host +contentOptions.path);
						content = content.match(/<url>([^<]*)<\/url>/)[1];
						console.log(content);

						complete();

					});
				});

				contentReq.end();

				var factReq = http.request(factOptions, function(factRes){

					factRes.setEncoding("utf8");
					factRes.on("data", function(chunk){
						fact += chunk;
					})

					factRes.on("end", function() {

						console.log("Querying: " + factOptions.host + factOptions.path);
						fact = fact.match(/\[([^)]+)\]/)[1];
						fact = fact.replace(/"/g,"");
						console.log(fact);

						complete();
						
					})
				})

				factReq.end();

				function complete(){
					if (!(content == "") && !(fact == "")){
						msgBox.delete();
						msg.channel.send("**Random Cat Fact: ** " + fact + "\n \n" + content);
					} else {
						console.log("Check failed " + content + " | " + fact);
					}
				}

			});

		}
		else if ((parseMessage == prefix + "dog") || (parseMessage == prefix + "puppy")) {

			var factOptions = {
				host: "dog-api.kinduff.com",
				port: 80,
				path: "/api/facts?number=1"
			};

			var content = "";
			var fact = "";

			msg.reply("Searching for only the best of dogs . . .")
				.then(function(msgBox){

				randomPuppy()
					.then(url => {
						console.log("Querying npm random-puppy");
						content = url;
						console.log(url);

						complete();
					})

				var factReq = http.request(factOptions, function(factRes){

					factRes.setEncoding("utf8");
					factRes.on("data", function(chunk){
						fact += chunk;
					})

					factRes.on("end", function() {

						console.log("Querying: " + factOptions.host + factOptions.path);
						try {
							fact = fact.match(/\[([^)]+)\]/)[1];
						}
						catch(err){

						}
						fact = fact.replace(/"/g,"");
						console.log(fact);

						complete();
						
					})
				})

				factReq.on('error', function(e) {
				  console.error(e);
				});

				factReq.end();

				function complete(){
					if (!(content == "") && !(fact == "")){
						msgBox.delete();
						msg.channel.send("**Random Dog Fact: ** " + fact + "\n \n" + content);
					} else {
						console.log("Check failed " + content + " | " + fact);
					}
				}

			});

		}
		else if (parseMessage.startsWith(prefix + "roll")){

			msg.channel.send("Rolling . . . :game_die:")
				.then(function(msgBox){

				setTimeout( function(){

					var parameter = parseMessage.split(prefix + "roll")[1];
					var limiters = parameter.split(";");

					msgBox.delete();
					if (parameter.replace(/ /g, "") == ""){
						msg.channel.send("Rolled a **" + getRandomInt(1, 10) + "** out of 10.");
					} else if ((limiters[0] != null) && (limiters[1] !== null) && !(isNaN(parseInt(limiters[0]))) && !(isNaN(parseInt(limiters[1])))){
						var min = parseInt(limiters[0]);
						var max = parseInt(limiters[1]);
						if (min > max){
							min, max = max, min;
						}
						msg.channel.send("Rolled a **" + getRandomInt(min, max) + "** from " + min + " to " + max + ".");
					} else if (!isNaN(parseInt(parameter))) {
						msg.channel.send("Rolled a **" + getRandomInt(1, parameter) + "** out of " + parameter + ".");
					} else {
						msg.channel.send("Please provide a valid number after roll!");
					}

				}, 1400);
			})

		}
		else if (parseMessage.startsWith(prefix + "8ball")){

			msg.channel.send(":8ball: Peering into the great magic 8-ball . . .")
				.then(function(msgBox){

				setTimeout( function(){

					msgBox.delete();

					var choices = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely",
					"Outlook good", "Yes","Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now",
					"Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no",
					"Outlook not so good", "Very doubtful"];

					msg.channel.send("**" + choices[getRandomInt(0,choices.length-1)] + "**");

				}, 1400);
			})
			
		}
		else if (parseMessage.startsWith(prefix + "coinflip")){

			msg.channel.send(":money_with_wings: The coin is in the air! :money_with_wings: ")
				.then(function(msgBox){

				setTimeout( function(){

					msgBox.delete();

					if (getRandomInt(0,coinFlipFailChance) == coinFlipFailChance){
						msg.channel.send("The coin landed ... **upright on it's side!** (1 in " + coinFlipFailChance + " chance of occurence!)")
					} else {
						if (getRandomInt(0,1) == 0){
							msg.channel.send("The coin landed on ... **Heads!**");
						} else {
							msg.channel.send("The coin landed on ... **Tails!**");
						}
					}

				}, 1400);
			})
			
		}

		else if (parseMessage == prefix + "games"){

		msg.reply("Here are the following games I can launch:\n \nSay `"+prefix+"game title` to start a game.\n \
\n```358 [3-5-8] \nbattleship \ncah [Cards Against Humanity] \ncheckers \nchess \n3chess [Three-Way-Chess] \nconnect4 \ndominoes \ngo \nmahjong\
\npapersoccer \nrps [Rock-Paper-Scissors] \nrps2 [Rock-Paper-Scissors-Lizard-Spock] \nshogi \nskribblio [Pictionary] \nspades \ntos [Town of Salem] \
\nttt [Tic-Tac-Toe] \ntttu [Tic-Tac-Toe Ultimate] \npinturillo [Draw My Thing] \nquickdraw [Google's Quick, Draw!] \nworldwar [Risk] \nxiangqi [Chinese Chess] ``` \
\n \n Once you've created a lobby, copy the lobby link to invite people or tell them your lobbyId");
		}
		
		else if (parseMessage.startsWith(prefix + "game")){

			var query = parseForQuery(msg.content, ["game"]);
			query = query.replace(/ /g, "");
			query = query.replace(/-/g, "");

			if (query == ""){
				msg.reply("Please enter a game type after `game` and I'll start a game for you! Say `" + prefix + "games` to see a list of available games.");
			}
			else {
				if (query == "chess"){
					msg.reply("Play a game of Chess:\nhttp://plainchess.timwoelfle.de/");

				} else if ((query == "tos") || (query == "townofsalem") || (query == "town")){
					msg.reply("Play a game of Town of Salem: \nhttp://blankmediagames.com/TownOfSalem/");

				} else if (query == "battleship"){
					msg.reply("Play a game of Battleship: \nhttps://battleship-game.org/en/");

				} else if ((query == "cah") || (query == "cardsagainsthumanity")){
					msg.reply("Play a game of Town of Salem: \nhttp://pyx-3.pretendyoure.xyz/zy/game.jsp");

				} else if (query == "checkers"){
					msg.reply("Play a game of Checkers: \nhttps://www.playok.com/en/checkers/");

				} else if ((query == "cchess") || (query == "chinesechess") || (query == "xiangqi")){
					msg.reply("Play a game of Xiangqi: \nhttps://www.playok.com/en/xiangqi/");

				} else if ((query == "connect4") || (query == "find4") || (query == "connectfour") || (query == "findfour")){
					msg.reply("Play a game of Connect 4: \nhttps://c4arena.com/");

				} else if (query == "go"){
					msg.reply("Play a game of Go: \nhttps://www.playok.com/en/go/");

				} else if (query == "dominoes"){
					msg.reply("Play a game of Dominoes: \nhttps://www.playok.com/en/dominoes/");

				} else if (query == "mahjong"){
					msg.reply("Play a game of Checkers: \nhttps://www.playok.com/en/mahjong/");

				} else if (query == "358"){
					msg.reply("Play a game of 3-5-8: \nhttps://www.playok.com/en/358/");

				} else if (query == "spades"){
					msg.reply("Play a game of Spades: \nhttps://www.playok.com/en/spades/");

				} else if (query == "shogi"){
					msg.reply("Play a game of Shogi: \nhttps://www.playok.com/en/shogi/");

				} else if ((query == "papersoccer") || (query == "soccer")){
					msg.reply("Play a game of Paper Soccer: \nhttps://www.playok.com/en/soccer/");

				} else if ((query == "3chess") || (query == "trichess") || (query == "threewaychess") || (query == "3waychess")){
					msg.reply("Play a game of Tri Chess: \nhttp://www.trichess.com/play-trichess-online/");

				} else if ((query == "rps") || (query == "rockpaperscissors") || (query == "rsb") || (query == "roshambo")){
					msg.reply("Play a game of Rock-Paper-Scissors: \nhttp://roshambo.me/");

				} else if ((query == "rpsls") || (query == "rockpaperscissorslizardspock") || (query == "rps2")){
					msg.reply("Play a game of Rock-Paper-Scissors-Lizard-Spock: \nhttps://rpsls.net/");

				} else if (query == "quickdraw"){
					msg.reply("Play a game of Quick, Draw!: \nhttps://quickdraw.withgoogle.com/");

				} else if ((query == "ttt") || (query == "tictactoe")){
					msg.reply("Play a game of Tic-Tac-Toe: \nhttp://mck-.github.io/T3/#/");

				} else if ((query == "tttu") || (query == "ttt2") ||(query == "tictactoeultimate")){
					msg.reply("Play a game of Tic-Tac-Toe Ultimate: \nhttp://mck-.github.io/T3/#/");

				} else if ((query == "pinturillo") || (query == "dmt") || (query == "drawmything") || (query == "drawsomething")){
					msg.reply("Play a game of Draw My Thing [Pinturillo]: \nhttp://www.pinturillo2.com/")
				
				} else if ((query == "skribblio") || (query == "pictionary")){
						msg.reply("Play a game of Skribblio [Pictionary]: \nhttp://skribbl.io/");

				} else if ((query == "worldwar") || (query == "risk")){
						msg.reply("Play a game of World War [Risk!]: \nhttps://www.gambit.com/signup/join/487382");

				}

				
			}
		}

		else if (parseMessage.startsWith(prefix + "choose")){

			msg.channel.send(":crystal_ball: Peering into the all great all-seeing crystal ball!")
				.then(function(msgBox){

				setTimeout( function(){

					msgBox.delete();

					var choices = parseMessage.split(prefix + "choose")[1].split(";");

					console.log(choices.length);

					msg.channel.send("It chose . . . **" + choices[getRandomInt(0,choices.length-1)] + "**!")

				}, 1400);
			})

			;
		}
		else if (parseMessage.startsWith(prefix + "purge")){
			if (msg.member.roles.has(msg.guild.roles.find("name", "Admin").id)){
				var maxno = parseInt(parseMessage.split(prefix + "purge")[1]);
				if (isNaN(maxno) || maxno < 1){
					msg.reply("You must provide a valid number greater than 0");
				} else if (maxno > maxPurgeLimit){
					msg.reply("For precautionary reasons, you cannot delete more than " + maxPurgeLimit + " messages at a time.");
				} else {
					msg.channel.bulkDelete(maxno + 1);
					msg.reply("Successfully deleted " + maxno + " messages");
				}
			} else {
				msg.reply("Only an Admin can use this command!");
			}
			
		}
		else if ((parseMessage == prefix + "server") || (parseMessage == prefix + "servers")) {

			msg.reply("Checking if the Unturned server is up! Pinging . . .")
			.then(function(msgBox_Unturned){
				exec('tasklist', function(err, stdout, stderr) {
					if (stdout.indexOf("Unturned.exe") != -1){
						announceServer(msgBox_Unturned, true, "Unturned");
					} else {
						announceServer(msgBox_Unturned, false, "Unturned");
					}
				});

			});

			msg.reply("Checking if the Minecraft server is up! Pinging . . .")
			.then(function(msgBox_Minecraft){

				mcping('98.14.220.9', 25565, function(err, res) {
					if (err) {
						// Some kind of error
						announceServer(msgBox_Minecraft, false, "Minecraft");
					} else {
						// Success!
						announceServer(msgBox_Minecraft, true, "Minecraft");
					}
				}, 3000);

			});


			function announceServer(msgBox, foundServer, serverType){
				msgBox.delete();
				if (foundServer){
					console.log("The " + serverType + " server is running");
					msg.channel.send(":white_check_mark: **The " + serverType + " server is currently running!**");
				} else {
					console.log("The "+ serverType + " server is not running");
					msg.channel.send(":x: The " + serverType + " server is currently down.");
				}
			}

			
		}

		else if ((parseMessage == prefix + "checkram") || (parseMessage == prefix + "checkmem") || (parseMessage == prefix + "checkmemory")) {
			msg.reply("Checking the memory status . . . ")
			.then(function(msgBox){
				var mem_total_bytes = os.totalmem();
				var mem_free_bytes = os.freemem();

				var mem_total_gb = Math.round(bytesToGigabytes(mem_total_bytes) * 100)/100;
				var mem_free_gb = Math.round(bytesToGigabytes(mem_free_bytes) * 100)/100;

				var mem_usage_gb = Math.round((mem_total_gb - mem_free_gb)*100)/100;
				var mem_percentage = Math.round((mem_usage_gb/mem_total_gb)*10000)/100;

				var append = "\n \nStatus: ";

				if (mem_percentage < 20){
					append = append + "Godly :yellow_heart:";
				}
				else if (mem_percentage < 40){
					append = append + "Excellent :blue_heart:";
				}
				else if (mem_percentage < 60){
					append = append + "Healthy :green_heart:";
				}
				else if (mem_percentage < 80){
					append = append + "Average :heart:";
				}
				else if (mem_percentage < 90){
					append = append + "Stressed :black_heart:";
				}
				else if (mem_percentage < 100){
					append = append + ":warning: NEARING CAPACITY :warning: \n **Consider contacting @165200309277294592 @DeveloperBlue **";
				}
				else if (mem_percentage < 110){
					append = append + ":skull: Usage calculate to be over 100%. God has left  us. The computer is dead. Contact DeveloperBlue. :skull:";
				}
				else {
					append = "Failed to calculate status. \n Possible cause: Usage over 110% \n Possible cause: Shit code \n Possible cause: Divine intervention";
				}

				msgBox.delete();
				msg.reply("\n \n The desktop server is currently using **" + mem_usage_gb + "gb** of **" + mem_total_gb + "gb** RAM. (**"+mem_percentage+"%** Usage) \n \n***" + mem_free_gb + "gb*** *memory available.*" + append);
				
			});

			function bytesToGigabytes(bytes){
				return bytes / 1073741824;
			}
		}
		

		/*
			Hated Commands
		*/
		else if ((parseMessage == prefix + "clear hate") || (parseMessage == prefix + "clearhate")){
			unloved = null;
			msg.reply("All are loved");
		}
		else if ((parseMessage == prefix + "fuck you") || (parseMessage == prefix + "fu")) {
			unloved = msg.author;
			msg.reply("Go fuck yourself :^)");
		}
		else if (parseMessage == prefix + "hated") {
			if (unloved == null){
				msg.reply("I love all!");
			}
			else {
				msg.channel.send("I don't have much liking for @" + `${unloved.id} ...`);
			}
		}
		/*
			Search query commands
		*/
		else if ((parseMessage.startsWith(prefix + "domath")) || (parseMessage.startsWith(prefix + "do math"))) {

			var query = parseForQuery(msg.content, ["domath", "do math"]);

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter some information after `domath` and I'll ask my friend WolframAlpha!");
			}
			else {
				msg.reply("https://www.wolframalpha.com/input/?i=" + encodeURIComponent(query) + " ");
			}
			
		}
		else if (parseMessage == prefix + "weather"){

			msg.channel.send("Getting the weather for New York City . . .")
				.then(function(msgBox){

					var query = new yahooWeather('select * from weather.forecast where (location = 12589352)');

					query.exec(function(err, data) {

						console.log(data);

						var location = data.query.results.channel.location;

						if (location != null){

							var condition = data.query.results.channel.item.condition;
				
							console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
							msgBox.delete()
							msg.channel.send('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');
						} else {
							console.log("Invalid location in weatherApi");
							msgBox.delete()
							msg.channel.send("Something went wrong with the weather API!");
						}

					});

				})
				.catch(console.error);
		}
		else if ((parseMessage.startsWith(prefix + "google")) || (parseMessage.startsWith(prefix + "search"))){

			var reference = "";

			if (parseMessage.startsWith(prefix + "google")) {
				reference = "google";
			} else {
				reference = "search";
			}

			var query = parseForQuery(msg.content, [reference]);

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter some information after `" + reference + "` and I'll check it out for you!");
			}
			else {
				msg.channel.send("Getting google search results for `" + query + "` . . .")
				.then(function(msgBox){
					
					var content = "";

					google(query, function (err, res){

						if (err) console.error(err)

						for (var i = 0; i < google.resultsPerPage; ++i) {
							var link = res.links[i];
							if (link.href != null){
								content += link.title + " - " + link.href + "\n";
							}
						}

						msgBox.delete()
						msg.channel.send("Displaying search results for ``" + query + "``: \n \n" + content + "\n \n All results: https://www.google.com/search?q=" + encodeURIComponent(query));

					})

				})

	
			}

			
		}
		else if (parseMessage.startsWith(prefix + "safesearch")){

			var query = parseForQuery(msg.content, ["safesearch"]);

			if (query.replace(/ /g, "") == ""){
				msg.reply("SafeSearch for the " + prefix + "images command is currently set to **" + isSafeSearchOn.toString() + "**.");
			} else if ((query == "on") || (query == "true")){
				isSafeSearchOn = true;
				console.log("SafeSearch was set to " + isSafeSearchOn.toString());
				msg.channel.send("SafeSearch for the " + prefix + "images command was set to **" + isSafeSearchOn.toString() + "**");
			} else if ((query == "off") || (query == "false")){
				isSafeSearchOn = false;
				console.log("SafeSearch was set to " + isSafeSearchOn.toString());
				msg.channel.send("SafeSearch for the " + prefix + "images command was set to **" + isSafeSearchOn.toString() + "**");
			} else {
				msg.reply("To toggle SafeSearch, please use the parameters **'on'** or **'off'**. Currently, SafeSearch is **" + isSafeSearchOn.toString() + "**.");
			}

		}
		else if ((parseMessage.startsWith(prefix + "images")) || (parseMessage.startsWith(prefix + "image"))) {

			var reference = "";

			if (parseMessage.startsWith(prefix + "images")) {
				reference = "images";
			} else {
				reference = "image";
			}

			var query = parseForQuery(msg.content, [reference]);

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter some information after `" + reference + "` and I'll check it out for you! [SafeSearch: **" + isSafeSearchOn.toString() + "**]");
			}
			else {
				msg.channel.send("Getting image results for `" + query + "` . . .")
				.then(function(msgBox){

					var usingSafeSearch = "off";
					if (isSafeSearchOn){
						usingSafeSearch = "high";
					}

					var content = "";

					var maxno = 5;

					if (reference == "image"){
						maxno = 1;
					}

					gImagesClient.search(query, {safe: usingSafeSearch})
					.then(images => {
						console.log(images.length);
						for (i = 0; i < images.length && i < maxno; i++){
							console.log(images[i].url);
							content += images[i].url + "\n";
						}
							
						msgBox.delete()
						msg.channel.send("Displaying image results for ``" + query + "`` | [SafeSearch: **" + isSafeSearchOn.toString() + "**] : \n \n" + content);

					});

				})

			}

		}
		else if (parseMessage.startsWith(prefix + "amazon")){

			var query = parseForQuery(msg.content, ["amazon"]);

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter some information after `amazon` and I'll check it out for you!");
			}
			else {
				msg.reply("https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=" + encodeURIComponent(query) + " ");
			}
			
		}
		else if (parseMessage.startsWith(prefix + "unturned")){

			var query = parseForQuery(msg.content, ["unturned"]);
;   

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter an item or vehicle name after `unturned` and I'll try to grab their ids for you!");
			}
			else if (query.replace(/ /g, "").length < 2){
				msg.reply("Please enter a item or vehicle name longer than 2 characters for me to look it up for you!");
			}
			else {
				
				var finishedMessage = false;
				var finishedItemNameLoop = false;

				msg.reply("Searching for . . . **" + query + "**. ")
					.then(function(msgBox){

						var results = "";
						var idDirectories = [itemIdDir];

						for (var dir = 0; dir <= idDirectories.length - 1; dir){
							fs.readdir(idDirectories[dir], (err, subFolders) => {
								console.log(subFolders);
								subFolders.forEach(subFolder => {
									fs.readdir((idDirectories[dir]+"/"+subFolder), (errB, itemFolders) => {
										console.log("dir = " + dir + " | " + idDirectories[dir]+"/"+subFolder + " -> " +  itemFolders);
										itemFolders.forEach(itemFolder => {
											var nameData;
											var itemId;

											var namePath = idDirectories[dir] + "/"+subFolder+"/"+itemFolder+"/English.dat";

											if (fs.existsSync(namePath)){
												console.log("File exists");
												nameData = parseForQuery(fs.readFileSync(namePath , "utf8"), ["Name "]).split(/\r?\n/)[0];
											}
											else {
												console.log("File does not exist - generating");
												nameData = itemFolder.replace(/_/g, " ");
											}


											if (nameData.toLowerCase().includes(query.toLowerCase())){
												console.log("itemName - " + nameData);
											}

											if ((nameData != null) && (nameData.toLowerCase().includes(query.toLowerCase()))){
												var itemData = fs.readFileSync(idDirectories[dir] + "/"+subFolder+"/"+itemFolder+"/"+itemFolder+".dat", "utf8");
												var itemDataLines = itemData.split(/\r?\n/);
												if (itemDataLines.length > 0){
													for (var i = 0; i < itemDataLines.length - 1; i++){
														if (itemDataLines[i].startsWith("ID ")){
															itemId = parseForQuery(itemDataLines[i], ["ID "]);
															results = results + itemName + " - " + itemId + "\n";
															console.log("itemID - " + itemId);
														}
													}
												}
											}
												
										});
									});
									console.log("done");
									
								});
							})
						}

						msgBox.delete()

						if (results == ""){
							msg.channel.send("Sorry, I couldn't find any relevant data on **'"+query+"'**");
						} else {
							msg.channel.send("Here's what I found for **" + query + "** : \n \n ```" + results + "```");
						}

					})
					.catch(console.error);

					function complete(){

					}

			}
			
		}

		else if (parseMessage.startsWith(prefix + "porn")){

			var query = parseForQuery(msg.content, ["porn"]);

			var searchProviders = ["http://www.pornhub.com/video/search?search=", "https://www.xvideos.com/?k=", "https://www.redtube.com/?search=", "http://motherless.com/term/"]

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter some information after `porn` and I'll check it out for you!");
			}

			else {
				msg.reply(searchProviders[getRandomInt(0, searchProviders.length)] + encodeURIComponent(query) + " ");
			}
			
		}
		else if (parseMessage.startsWith(prefix + "youtube")){

			var query = parseForQuery(msg.content, ["youtube"]);

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter some information after `youtube` and I'll check it out for you!");
			}
			else {
				msg.reply("https://www.youtube.com/results?search_query=" + encodeURIComponent(query) + " ");
			}

			
		}
		else if (parseMessage.startsWith(prefix + "anime")){

			var query = parseForQuery(msg.content, ["anime"]);

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter the name of an anime and I'll check it out for you!");
			}
			else {
				msg.reply("Here's what I got . . . \n \
**MAL Information:** \n https://myanimelist.net/search/all?q=" + encodeURIComponent(query) + " \n \n \
**Watch Here:** \n \
http://anilinkz.io/search?q=" + encodeURIComponent(query) + " \n \
http://www.ryuanime.to/search.php?search=" + encodeURIComponent(query) + " \n \
http://www.chia-anime.tv/search/" + encodeURIComponent(query) + " \n \
http://www.gogoanime.to/?s=" + encodeURIComponent(query) + " \n \
\n \
				") ;
			}

		}

		 // 
		else if (parseMessage.startsWith(prefix + "say")){

			var query = parseForQuery(msg.content, ["say"]);

			var count = (query.match(/say/g) || []).length;

			var istts = (query.startsWith("/tts"));

			if (istts){
				query = parseForQuery(query, ["/tts"]);
			}

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter a word or phrase after `say` and I'll say it for you!");
			}
			else if (count > 2){
				msg.reply("I'm afraid I can't say anything with more than 2 " + prefix + "say commands!");
			}
			else {
				msg.channel.send(query + " ` -" + msg.author.username + "`", {tts:istts});
			}
			
		}
		else if (parseMessage.startsWith(prefix + "tts")){

			var query = parseForQuery(msg.content, ["tts"]);

			var count = (query.match(/tts/g) || []).length;

			if (query.replace(/ /g, "") == ""){
				msg.reply("Please enter a word or phrase after `tts` and I'll say it for you!");
			}
			else if (count > 0){
				msg.reply("I'm afraid I can't tts anything with more than one " + prefix + "tts commands!");
			}
			else {
				msg.channel.send(query, {tts:true});
			}
			
		}
	} catch (e){
		console.log("An error was own -");
		console.log(e);
		console.log("- An error was thrown");
	}

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER MANAGEMENT ///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function startScheduledTasks(){

	var server_dir = "C:/Users/Mike/Desktop/Minecraft_Server"
	var serverWarningStart = "IfWinExist, DeveloperBlue's Minecraft Server 2.0\n {\n WinActivate\n SetKeyDelay -1 \n BlockInput On \n Send, {BackSpace}say "
    var serverWarningEnd = "\nBlockInput Off \n return\n}"

    var isBackingUp = false;
    var isBackupComplete = false;
    var backupHour = 11;
    var warningHour = backupHour - 1;

	console.log("Scheduled Tasks Online");

	function sendWarning(message){
		fs.writeFile(server_dir + "/Warning.ahk", serverWarningStart+message+serverWarningEnd, function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("Sending warning - " + message);

			exec(server_dir + "/Warning.ahk", function( error, stdout, stderr){

				if ( error != null ) {
					console.log(stderr);

				} else {

				}
			});

		});

	}

	/*
	schedule.scheduleJob('* 12 * * *', function(){
		client.sendMessage(client.servers.get('id',"SERVERID").channels.get('name','general_dead'),"Joke of the day: ")
	});
	*/

	schedule.scheduleJob('00 ' + warningHour + ' * * *', function(){
		sendWarning("[Aurora]: The server will temporarily close in 60 minutes at " + backupHour + ":00 EST for automatic backup.{Enter}");
	});

	schedule.scheduleJob('30 ' + warningHour + ' * * *', function(){
		sendWarning("[Aurora]: The server will temporarily close in 30 minutes at " + backupHour + ":00 EST for automatic backup.{Enter}");
	});

	schedule.scheduleJob('50 ' + warningHour + ' * * *', function(){
		sendWarning("[Aurora]: The server will temporarily close in 10 minutes at " + backupHour + ":00 EST for automatic backup.{Enter}");
	});

	schedule.scheduleJob('55 ' + warningHour + ' * * *', function(){
		sendWarning("[Aurora]: The server will temporarily close in 5 minutes at " + backupHour + ":00 EST for automatic backup. It will be back up shortly.{Enter}");
	});

	schedule.scheduleJob('58 ' + warningHour + ' * * *', function(){
		sendWarning("[Aurora]: The server will temporarily close in 2 minutes at " + backupHour + ":00 EST for automatic backup. It will be back up shortly. Prepare to leave. {Enter}");
	});

	schedule.scheduleJob('59 ' + warningHour + ' * * *', function(){
		sendWarning("[Aurora]: The server will temporarily close in 1 minute at " + backupHour + ":00 EST for automatic backup. It will be back up shortly. Prepare for closing. {Enter}");
	});

	schedule.scheduleJob('00 ' + backupHour + ' * * *', function(){
		// The server will temporarily close for automatic backup. It will be back up shortly.
		console.log("Starting scheduled shut down . . . ");

		sendWarning("[Aurora]: The server will temporarily close for automatic backup. {Enter}");

		exec('tasklist /fi "windowtitle eq DeveloperBlue\'s Minecraft Server 2.0"', function(err, stdout, stderr){
			if (stdout.indexOf("INFO: No tasks are running which match the specified criteria.") == -1){

				console.log("Attempting to stop server . . .");

				isBackingUp = true;
				isBackupComplete = false;

				exec(server_dir + "/CloseMinecraftServer.ahk", function( error2, stdout2, stderr2){
					if ( error2 != null ) {
						console.log(stderr2);
						// error handling & exit
					} else {

						console.log("Pausing for server close . . .");

						setTimeout( function(){

							console.log("Attempting to backup server . . .");

							var getDate = dateTime.create().format('Y-m-d_H-M-S');
							var output = fs.createWriteStream(server_dir + "/Backup/world_backup_"+getDate+".zip");
							var archive = archiver('zip', {
								zlib: { level: 9 } // Sets the compression level.
							});

							output.on('close', function() {

								console.log(archive.pointer() + ' total bytes');
								console.log('Server was successfully backed up.');

								isBackingUp = false;
								isBackupComplete = false;

								console.log("Attempting to relaunch server . . .");

								exec(server_dir + "/AuroraBotLauncher.ahk", {cwd: server_dir}, function( error3, stdout3, stderr3){

									if ( error3 != null ) {
										console.log(stderr3);

									} else {

										isBackingUp = false;
										isBackupComplete = true;

										console.log("Server successfully launched.");
									}
								});

							});

							archive.on('warning', function(err) {

								if (err.code === 'ENOENT') {
									// log warning
								} else {
									// throw error

									isBackingUp = false;
									isBackupComplete = false;

									throw err;
								}
							});

							// good practice to catch this error explicitly
							archive.on('error', function(err) {

								isBackingUp = false;
								isBackupComplete = false;

								throw err;
							});

							archive.pipe(output);

							archive.directory(server_dir+"/world", "/world");
							archive.directory(server_dir+"/world_nether", "/world_nether");
							archive.directory(server_dir+"/world_the_end", "/world_the_end");

							archive.finalize();

							console.log("Finished running save commands - waiting for actual save");

						}, 20000);

					}
					
					// normal 

				});

			} else {
				console.log("The server is not running for scheduled shut down.");
			}
		});

	});


}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INIT ////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////


client.login('MjY1NDQ1MDAzMTc2ODM3MTIw.C0vOow.nul5Z83vH8W02S7FL_y-dSfl6Is');

/*

Michael Rooplall | DeveloperBlue

MichaelRooplall@gmail.com

*/