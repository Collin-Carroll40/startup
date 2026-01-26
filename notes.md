# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Startup Server Setup
EC2 Instance Setup

Region: Selected US East (N. Virginia) us-east-1 (Required for class AMI).

AMI: Used the specific class image: ami-094c4a0be0b642a24 (Web Programming 260 Server v8).

Instance Type: t3.micro (Free tier eligible).

Key Pair: Created startup-key.pem and stored it locally (permissions set to 400).

Firewall (Security Group): Configured to allow SSH (22), HTTP (80), and HTTPS (443) from anywhere.

Networking (Elastic IP)

Allocated a permanent Elastic IP address (100.51.137.17) to prevent IP changes on reboot.

Associated the Elastic IP with the running EC2 instance.

Domain Registration (Route 53)

Registered domain: collincarroll-startup.click.

(Note: required upgrading AWS account to paid plan to bypass student restrictions).

Verified email address to prevent domain suspension.

DNS Configuration

Created two A Records in Route 53 pointing to the Elastic IP (100.51.137.17):

Root (@): collincarroll-startup.click

Wildcard (*): *.collincarroll-startup.click (covers simon. and startup. subdomains).

Server Configuration (Caddy & HTTPS)

SSH Access: Connected to server via terminal: ssh -i startup-key.pem ubuntu@100.51.137.17

Caddyfile: Edited /etc/caddy/Caddyfile to remove the default :80 block and add HTTPS support for three routes:

Root (/usr/share/caddy for static files)

startup. subdomain (Reverse proxy to port 4000)

simon. subdomain (Reverse proxy to port 3000)

Restart: Applied changes with sudo service caddy restart.

Result: Verified site loads with a secure connection (HTTPS/Lock icon).
## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML 

- **Structure:** Created the main application structure using semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`) across four different pages.
- **Pages Created:**
  - `index.html`: The login page serving as the entry point.
  - `dashboard.html`: The main team interface with placeholders for charts and data.
  - `leads.html`: A data-rich page displaying a table of leads (database placeholder).
  - `import.html`: A functionality page for uploading files (input placeholder).
- **Page Components:**
  - Added a consistent navigation sidebar to simulate the application's flow.
  - Implemented input forms for login and file uploads.
  - Added placeholders for WebSocket data (live team activity feed) and 3rd party service calls.
  - Used SVG icons for the application logo.
- **Deployment:** Successfully deployed the application to `startup.collincarroll-startup.click` using the `deployFiles.sh` script with my PEM key.

### Code Examples

I implemented a consistent sidebar navigation structure using HTML tables (to be replaced with Flexbox in the CSS deliverable):

```html
<td width="20%" valign="top">
  <nav>
    <ul>
      <li><a href="dashboard.html">Team Dashboard</a></li>
      <li><a href="leads.html">Available Leads</a></li>
      <li><a href="import.html">Import Leads</a></li>
      <li><a href="#">My Cadence</a></li>
      <li><a href="index.html">Logout</a></li>
    </ul>
  </nav>
</td>
```


## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
