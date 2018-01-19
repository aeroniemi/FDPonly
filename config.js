module.exports = {
    //Port to run web server on (default: 80)
    port: 80,
    //Whether form entry is permitted
    forms: false,
    //Mode of ATC data (default VATSIM)
    mode: 'vatsim',
    //ATC Training data (default true)
    atcoTrainerActive: true,
    //NOTAMs (default true - only avilable when weather is active)
    notamsActive: true,
    //Weather (default true)
    weatherActive: true,
    //US Charts from FAA (default false)
    chartsActive: false,

    //Branding data
    branding: {
        //Web title (raw text)
        title: 'For Documentation Purposes Only',
        //Website title (HTML formatted)
        titleRich: 'For <strong>documentation</strong> purposes only',
    },
    indexZ: {
        TopTitleRich: 'For <strong>documentation</strong> purposes only',
        TopSubTitleRich: 'Here we go with more data and stuff and more stuff and im bored writing (help!)',

    }
};
