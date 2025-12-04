---
id: automating-claude
title: Automating Claude
excerpt: With AI tools getting more and more capable for coding, the dream of working like Homer is becoming more of a reality.
date: "2025-11-27"
author: Timothy Eichler
color: var(--accent-cyan)
---

With AI tools getting more and more capable for coding, the dream of working like Homer is becoming more of a reality. Instead of having a bird cover for us (see the video: [https://www.youtube.com/shorts/PPk-z5ZJcrA](https://www.youtube.com/shorts/PPk-z5ZJcrA)), we have created automate_claude.

The magic first starts with breaking down your tasks into iterative Claude commands. Once this is done, one would normally have to enter them in and wait for them to execute. Automate Claude takes over this task for us - we can enter in the command sequence that we want it to execute, and it will take care to run the sequence of commands N times (whatever we decide).

In order to make sure work was completed properly, we run a check after each command and optionally retry if something went wrong. If we run out of usage and are throttled, the program will sleep until it can continue working again.

Note: in case you didn't know, each time we interact with a chat agent, the entire history of that chat session is sent to the model for computation, meaning we run our limits down faster. The automate command makes sure to run each command in a fresh session for us as well.

The command currently only runs on Linux but we would be open to updating it to other platforms if people are interested.

Check out the repo: [https://github.com/neichler-digital/automate-claude](https://github.com/neichler-digital/automate-claude)
