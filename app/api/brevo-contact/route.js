export async function POST(req) {
    try {
      const { email } = await req.json();
  
      const API_KEY = process.env.BREVO_API_KEY;
      const LIST_ID = process.env.BREVO_LIST_ID;
      const url = "https://api.brevo.com/v3/contacts";
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds: [parseInt(LIST_ID)],
        }),
      });      
  
      if (!response.ok) {
        throw new Error(`Brevo API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify({ message: "Contact added successfully", data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  