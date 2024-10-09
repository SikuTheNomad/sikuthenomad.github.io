document.getElementById('start').addEventListener('click', async () => {
    const startButton = document.getElementById('start');
    const bpmControls = document.getElementById('bpm-controls'); // Get BPM controls element

    // Hide the start button after it's clicked and show the BPM slider
    startButton.style.display = 'none';
    bpmControls.style.display = 'block'; // Show BPM slider after starting sequence

    // Start Tone.js context on user interaction
    await Tone.start();

    const numSteps = 16; // Number of steps in the sequencer
    const numRows = 8; // Number of rows in the sequencer
    const sequencerDiv = document.getElementById('sequencer');
    const bpmSlider = document.getElementById('bpm'); // BPM slider
    const bpmValueLabel = document.getElementById('bpm-value'); // Label to display BPM value

    // Create a 2D array to track active steps for each row
    const activeSteps = Array.from({ length: numRows }, () => Array(numSteps).fill(false));

    // Create an array to store the button references for each row
    const buttonsArray = [];

    // Define an array to store the synths and the notes for each row
    const synths = Array.from({ length: numRows }, () => new Tone.Synth().toDestination());

    // Define the initial notes for the rows
    const noteOptions = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
    let notes = [...noteOptions.slice(0, numRows)]; // Use the first 'numRows' notes

    // Create a button row for each sound/instrument
    for (let row = 0; row < numRows; row++) {
        const stepRow = document.createElement('div'); // Create a new row
        stepRow.classList.add('step-row');

        const buttons = []; // Store buttons for this row

        // Create a label to show the note
        const noteLabel = document.createElement('span');
        noteLabel.textContent = notes[row]; // Set initial note label
        noteLabel.classList.add('note-label'); // Add a class for styling
        stepRow.appendChild(noteLabel); // Append note label to the row

        for (let step = 0; step < numSteps; step++) {
            const button = document.createElement('button');
            button.classList.add('step-button');
            button.dataset.index = step; // Store the step index in the button's dataset

            // Toggle step activation on click
            button.addEventListener('click', () => {
                activeSteps[row][step] = !activeSteps[row][step]; // Toggle the state of the step
                button.classList.toggle('active-step', activeSteps[row][step]); // Update button style based on active state
            });

            stepRow.appendChild(button);
            buttons.push(button); // Add button to the current row's buttons array
        }

        buttonsArray.push(buttons); // Store the buttons for this row
        sequencerDiv.appendChild(stepRow); // Add the row to the sequencer
    }

    // Function to update all notes based on the selected scale
    const updateNotes = (scale) => {
        switch (scale) {
            case 'major':
                notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']; // Lowest note C4, highest C5
                break;
            case 'natural minor':
                notes = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5']; // Use 'b' instead of flat
                break;
            case 'melodic minor':
                notes = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'B4', 'C5']; // Reverse order, lowest note C4, highest A4
                break;
            // No default case; only the defined scales will update notes
        }

        // Update all note labels to reflect the new notes
        const noteLabels = document.querySelectorAll('.note-label');
        noteLabels.forEach((label, index) => {
            label.textContent = notes[index]; // Update label text
        });
    };

    // Create a scale selector dropdown
    const scaleSelector = document.createElement('select');
    const scales = ['major', 'natural minor', 'melodic minor'];

    scales.forEach(scale => {
        const option = document.createElement('option');
        option.value = scale;
        option.textContent = scale.charAt(0).toUpperCase() + scale.slice(1); // Capitalize first letter
        scaleSelector.appendChild(option);
    });

    // Set the default selected option to 'major'
    scaleSelector.value = 'major'; // Set 'major' as the default selection
    updateNotes('major'); // Update notes based on the default scale

    scaleSelector.addEventListener('change', (e) => {
        updateNotes(e.target.value); // Update notes when scale changes
    });

    bpmControls.appendChild(scaleSelector); // Append scale selector below BPM slider

    // Set up the sequence to play notes for each row
    const sequences = synths.map((synth, row) => {
        return new Tone.Sequence((time, step) => {
            // Check if the current step is active
            if (activeSteps[row][step]) {
                // Play the selected note if step is active
                synth.triggerAttackRelease(notes[row], '8n', time);
            }

            // Visually update the buttons to indicate the current step
            buttonsArray[row].forEach((btn, index) => { // Use buttonsArray to reference the buttons for the current row
                btn.classList.toggle('active', index === step);
            });
        }, [...Array(numSteps).keys()], '16n'); // 16th note resolution
    });

    // Start all sequences
    sequences.forEach(sequence => sequence.start(0));

    // Start the transport and play the sequence
    Tone.Transport.start();

    // Update BPM in real-time based on slider value
    bpmSlider.addEventListener('input', () => {
        const bpm = bpmSlider.value;
        Tone.Transport.bpm.value = bpm; // Update Tone.js Transport BPM
        bpmValueLabel.textContent = bpm; // Update the displayed BPM value
    });
});
