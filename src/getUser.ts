import {Client } from "pg";


async function getuser(email:string) {
const client =new Client({
     connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres"
})

// select query from prisma
try {
    await client.connect();
    const query = 'SELECT * FROM users WHERE email = $1';
    const values=[email];
    const res= await client.query(query,values);
    if (res.rows.length > 0) {
        console.log('User found:', res.rows[0]); // Output user data
        return res.rows[0]; // Return the user data
    }else{
        console.log('No user found with the given email.');
        return null; // Return null if no user was found
    }
} catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
}finally{
    await client.end();
}

    
}


getuser("jainam@gmail.com").catch(console.error)