const { execSync } = require('child_process');
try {
  const output = execSync('npx next build 2>&1', { encoding: 'utf8', cwd: process.argv[2], stdio: 'pipe' });
  if (output.includes('Failed to compile')) {
    console.log('BUILD FAILED');
    console.log(output.slice(-3000));
    process.exit(1);
  }
  console.log('BUILD SUCCESS!');
  console.log(output.slice(-500));
} catch (e) {
  const out = e.stdout || e.message;
  if (out && out.includes('Failed to compile')) {
    console.log('BUILD FAILED');
    console.log(out.slice(-3000));
  } else if (out) {
    console.log('BUILD SUCCESS (with warnings)');
    console.log(out.slice(-500));
  } else {
    console.log(e.message && e.message.slice(-2000));
  }
  process.exit(1);
}