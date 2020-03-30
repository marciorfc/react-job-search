const fetch = require('node-fetch');

const baseUrl = 'https://jobs.github.com/positions.json?description=java&page=1';

module.exports =  async function fetchGithub() {
    const res = await fetch(baseUrl);
    const jobs = await res.json();
    console.log(jobs);
    console.log(jobs.length);
    
}

module.exports();