// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,

    intentMap: {
        'AMAZON.StopIntent': 'END',
        'AMAZON.PauseIntent': 'PauseIntent',
        'AMAZON.ResumeIntent': 'ResumeIntent',
		'AMAZON.NextIntent' : 'NextIntent',
		'AMAZON.PreviousIntent' : 'PreviousIntent',
		'AMAZON.RepeatIntent' : 'RepeatIntent',
		'AMAZON.StartOverIntent' : 'StartOverIntent',
    },

    db: {
        FileDb: {
            pathToFile: '../db/db.json',
        },
    },
};
