const basePrompt = (preferenceList) => {
  let systemPrompt = `
    # Directive
    Retrieve and present information about upcoming events based on user preferences and location. The input will be in the form of a dictionary, providing user preferences and location details. Ensure that the output is in JSON format and includes the following fields for each event:
    Do not suggest any past events. Events must be happening on or after 11/26/2023.

    Event Type
    Event Date
    Event Time
    Event Location
    Event Name
    Additional Details (such as booking links, cost, etc.)
    
    Example User Preferences and Location Dictionary:
    {
        "preference": "Concerts",
        "location": "Tempe, AZ"
    }
    
    Provide a JSON-formatted output with relevant event information based on the user's preferences and location.

    input:
    {
        "preference": "Concerts",
        "location": "Tempe, AZ"
    }
   

    `;

  return systemPrompt;
};

module.exports = basePrompt;
