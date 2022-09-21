response = Map();
msg = message.get("text");
suggestions = {"Automotive Engineering Services","Digital Technology Solutions","Would you like a quotation for a service?","Partnering With Hinduja Tech"};
if(operation.equals("chat"))
{
	if(!msg.equalsIgnoreCase("Automotive Engineering Services") && !msg.equalsIgnoreCase("Digital Technology Solutions") && !msg.equalsIgnoreCase("Would you like a quotation for a service?") && !msg.equalsIgnoreCase("Partnering With Hinduja Tech"))
	{
		response.put("action","reply");
		response.put("replies",{"Welcome! What can I help you with, today?"});
		response.put("suggestions",{"Automotive Engineering Services","Digital Technology Solutions","Would you like a quotation for a service?","Partnering With Hinduja Tech"});
		return response;
	}
	if(suggestions.indexOf(msg) == -1)
	{
		response.put("action","reply");
		response.put("replies",{"Is there anything else I can help you with?"});
		response.put("suggestions",suggestions);
		return response;
	}
}
if(!msg.isNull())
{
	response.put("action","context");
	if(msg.equalsIgnoreCase("Automotive Engineering Services"))
	{
		response.put("context_id","aes");
		question = {"name":"aes_type","replies":{"Excellent! You can utilise our expertise in these segments"},"input":{"type":"select","options":{"1. Turnkey Project Execution","2. Mechanical Systems","3. Electrical & Electronics Systems","4. Costing & Sourcing","5. Business Relocation Services","Others"}}};
	}
	else if(msg.equalsIgnoreCase("Digital Technology Solutions"))
	{
		response.put("context_id","dts");
		question = {"name":"dts_type","replies":{"Cool!... You umbrella needs for digitalisation are covered here!"},"input":{"type":"select","options":{"ERP-SAP","Mobile App or Web Development","Advanced Technologies Solutions","Advanced AI Solutions","Others"}}};
	}
	else if(msg.equalsIgnoreCase("Would you like a quotation for a service?"))
	{
		response.put("context_id","quotation");
		question = {"name":"quotation_type","replies":{"Wow! I like your direct approach...We will quickly revert with a quotation for your requirements  "},"input":{"type":"select","options":{"Sales Inquiry Link"}}};
	}
	else if(msg.equalsIgnoreCase("Partnering With Hinduja Tech"))
	{
		response.put("context_id","partnering");
		question = {"name":"partnering_type","replies":{"Good to hear..."," join the club! Hinduja Tech has forged win-win relationships with multiple business partners .  Click the link below to view them. "},"input":{"type":"select","options":{"Our Succesful Collaborations"}}};
		response.put("questions",{question});
	}
	else if(msg.equalsIgnoreCase("End Chat"))
	{
		response.put("action","end");
		response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
		return response;
	}
	else if(msg.equalsIgnoreCase("Continue."))
	{
		response.put("action","end");
		response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
		return response;
	}
	else if(msg.equalsIgnoreCase("Continue"))
	{
		response.put("context_id","query");
		question = {"name":"query","replies":{{"text":"Please provide your area of interest in partnering with us.(To appear in our partnership page)"},{"text":"May I have your  work email address?","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
		response.put("questions",{question});
	}
	else
	{
		response = Map();
		response.put("action","reply");
		response.put("replies",{"Is there anything else I can help you with?"});
		response.put("suggestions",{"Automotive Engineering Services","Digital Technology Solutions","Would you like a quotation for a service?","Partnering With Hinduja Tech"});
		return response;
	}
	response.put("questions",{question});
}
return response;