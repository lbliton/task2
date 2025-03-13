const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Assuming the email is provided somewhere, e.g., as a constant or argument
const email = 'lbliton85@gmail.com'; // Replace with the actual email used for submission

// Get list of all files in the 'task' directory
const files = fs.readdirSync('task').filter(file => fs.statSync(path.join('task', file)).isFile());

// Debug: Output the number of files processed and check for hidden files
console.log(`Number of files: ${files.length}`);
if (files.length !== 256) {
    console.error('Error: Expected 256 files, found', files.length);
    process.exit(1);
}

// Function to calculate SHA3-256 hash of a file
function sha3_256(filePath) {
    const data = fs.readFileSync(filePath); // Read the file content as binary
    return crypto.createHash('sha3-256').update(data).digest('hex');
}

// Calculate SHA3-256 hashes for all files
const hashes = files.map(file => {
    const filePath = path.join('task', file);
    const hash = sha3_256(filePath);
    console.log(`${file}: ${hash}`); // Debug: print the file name and its hash
    return hash;
});

// Sort the hashes in descending order
hashes.sort((a, b) => b.localeCompare(a));

// Concatenate all the hashes without any separator
const concatenatedHashes = hashes.join('');

// Append the lowercase email to the concatenated hashes
const finalInput = concatenatedHashes + email.toLowerCase();

// Hash the final string with SHA3-256
const finalHash = crypto.createHash('sha3-256').update(finalInput).digest('hex');

// Output the final hash result
console.log('Final hash after appending email:', finalHash);
