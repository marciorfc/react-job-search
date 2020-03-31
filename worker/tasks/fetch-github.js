const fetch = require('node-fetch');

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);



const baseUrl = 'https://jobs.github.com/positions.json?description=java';

async function fetchGithub() {
    let resultCount = 1, onPage = 0;
    const allJobs = [];

    while(resultCount > 0) {
        const res = await fetch(`${baseUrl}&page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        //console.log(jobs);
        //console.log(jobs.length);
        resultCount = jobs.length;
        console.log('got', jobs.length, 'jobs');
        onPage++;
        //console.log('page', onPage);
    }
    console.log('got', allJobs.length, 'jobs total');

    //filtr
    const srJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        if (jobTitle.includes("junior") ||
            jobTitle.includes("manager")) {
                return false;
        }
        return true;
    });

    console.log('Filtered jobs to', srJobs.length);

    const success = await setAsync('github', JSON.stringify(allJobs));

    console.log({success});
    
}

//fetchGithub();

module.exports = fetchGithub;