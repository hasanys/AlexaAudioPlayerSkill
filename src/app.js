'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const {App} = require('jovo-framework');
const {Alexa} = require('jovo-platform-alexa');
const {JovoDebugger} = require('jovo-plugin-debugger');
const {FileDb} = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new JovoDebugger(),
    new FileDb(),
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

const fajr = 'https://audiofiles-skill.s3.amazonaws.com/fajr.mp3';
const zuhr = 'https://audiofiles-skill.s3.amazonaws.com/zuhr.mp3';
const maghrib = 'https://audiofiles-skill.s3.amazonaws.com/maghrib.mp3'; 

app.setHandler({
    LAUNCH() {
        return this.toIntent('PlayIntent');
    },
	NextIntent() {
		this.$alexaSkill.$audioPlayer.stop().tell("No Next track");
	},
	PreviousIntent() {
		this.$alexaSkill.$audioPlayer.stop().tell("No previous track");
	},
	RepeatIntent() {
		this.$alexaSkill.$audioPlayer.stop();
	},
	StartOverIntent() {
		this.$alexaSkill.$audioPlayer.stop();
	},
	
    PlayIntent() {
		if ("undefined" === typeof(this.$inputs.NumberRakaat) || "undefined" === typeof(this.$inputs.NumberRakaat.alexaSkill) || "undefined" === typeof(this.$inputs.NumberRakaat.alexaSkill.value)) {			
			this.$alexaSkill.$audioPlayer
				.setOffsetInMilliseconds(5000)
				.play(zuhr, 'token')
				.tell("Playing 4 rakaat salaat");
		} else {
			if (this.$inputs.NumberRakaat.alexaSkill.value == "2") {
				this.$alexaSkill.$audioPlayer
					.setOffsetInMilliseconds(4000)
					.play(fajr, 'token')
					.tell("Playing 2 rakaat");
			} else if (this.$inputs.NumberRakaat.alexaSkill.value == "3") {
				this.$alexaSkill.$audioPlayer
					.setOffsetInMilliseconds(4000)
					.play(maghrib, 'token')
					.tell("Playing 3 rakaat");
			} else if (this.$inputs.NumberRakaat.alexaSkill.value == "4") {
				this.$alexaSkill.$audioPlayer
					.setOffsetInMilliseconds(4000)
					.play(zuhr, 'token')
					.tell("Playing 4 rakaat");
			}
		}			
    },
    PauseIntent() {
        this.$alexaSkill.$audioPlayer.stop();

        // Save offset to database
		this.$user.$data.offset = this.$alexaSkill.$audioPlayer.getOffsetInMilliseconds();
        this.$user.$data.fileName = this.$alexaSkill.$audioPlayer.get
        this.tell('Paused!');
    },
    ResumeIntent() {
        this.$alexaSkill.$audioPlayer
            .setOffsetInMilliseconds(this.$user.$data.offset)
            .play(zuhr, 'token')
            .tell('Resuming!');
    },
    AUDIOPLAYER: {
        'AlexaSkill.PlaybackStarted'() {
            console.log('AlexaSkill.PlaybackStarted');
        },

        'AlexaSkill.PlaybackNearlyFinished'() {
            console.log('AlexaSkill.PlaybackNearlyFinished');
        },

        'AlexaSkill.PlaybackFinished'() {
            console.log('AlexaSkill.PlaybackFinished');
            this.$alexaSkill.$audioPlayer.stop();
        },

        'AlexaSkill.PlaybackStopped'() {
            console.log('AlexaSkill.PlaybackStopped');
        },

        'AlexaSkill.PlaybackFailed'() {
            console.log('AlexaSkill.PlaybackFailed');
        },
    },
});


module.exports.app = app;
