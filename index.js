const terminalProcedures = require('terminal-procedures')

terminalProcedures.list('KBRO').then(results => {
    console.log(JSON.stringify(results, null, 2))
})