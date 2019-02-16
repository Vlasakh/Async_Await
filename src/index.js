import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

console.clear();

const timeout = (n) => new Promise(res => setTimeout(res, n))

async function getUser(url) {
    await timeout(700);
    let qu1 = await fetch(url);
    let s1 = await qu1.json();
    return s1.results[0];
}

async function test1() {
    let url = 'https://randomuser.me/api/'
    
    // parallel
    let users = await Promise.all([getUser(url), getUser(url)]);
    console.group('parallel');
    console.log(users);
    users.forEach((item, index) => 
        console.log(`user ${index} = `, [Object.values(item.name).join(' '), item]))
    console.groupEnd();
    
    // series
    console.group('series');
    let user1 = await getUser(url);    
    console.log('s1=', [Object.values(user1.name).join(' '), user1])
    
    let user2 = await getUser(url);
    console.log('s2=', [Object.values(user2.name).join(' '), user2]) 
    console.groupEnd(); 
}

test1();