response = Map();
//info answers;
response.put("action","context");
response.put("context_id",context_id);
if(context_id.equals("aes"))
{
	aes_type = answers.get("aes_type").get("text");
	if(aes_type.equals("1. Turnkey Project Execution"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Turnkey Project Execution","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/product-engineering-services/full-product-development/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Automotive Engineering Services","End Chat"}});
		}
	}
	else if(aes_type.equalsIgnoreCase("2. Mechanical Systems"))
	{
		if(!answers.containsKey("mech"))
		{
			question = {"name":"mech","replies":{"Choose from following"},"suggestions":{"1. Product Development  ","2. Platform Engineering","3. Powertrain","4. Body Engineering","5. Interior & Exterior","6. Thermal Management","7. Competitive Benchmarking","8. Virtual Validation"}};
			response.put("questions",{question});
		}
		else
		{
			dtss = answers.get("mech").get("text");
			if(dtss.equalsIgnoreCase("1. Product Development"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Product Development**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			//  END 1. Product Development
			else if(dtss.equalsIgnoreCase("2. Platform Engineering"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Platform Engineering**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// END PLATFORM ENG
			else if(dtss.equalsIgnoreCase("3. Powertrain"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Powertrain**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// END POWERTRAIN
			else if(dtss.equalsIgnoreCase("4. Body Engineering"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Body Engineering**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// END BODY ENG
			else if(dtss.equalsIgnoreCase("5. Interior & Exterior"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Interior & Exterior**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// END INTERIOR & EXTERIOR
			else if(dtss.equalsIgnoreCase("6. Thermal Management"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Thermal Management**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//  question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// END THERMAL MANAGE
			else if(dtss.equalsIgnoreCase("7. Competitive Benchmarking"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Competitive Benchmarking**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address?","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//  question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// Competitive Benchmarking
			else if(dtss.equalsIgnoreCase("8. Virtual Validation"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Virtual Validation**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address?","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address?","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//  question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our staff will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// END Virtual Validation
			else
			{
				mech = answers.get("mech").get("text");
				response.put("action","end");
				response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
				return response;
			}
		}
	}
	else if(aes_type.equalsIgnoreCase("3. Electrical & Electronics Systems"))
	{
		if(!answers.containsKey("mech"))
		{
			question = {"name":"mech","replies":{"Choose from following"},"suggestions":{"1. Electrical and Embedded","2. Electric and Future Mobility"}};
			response.put("questions",{question});
		}
		else
		{
			pedts = answers.get("mech").get("text");
			if(pedts.equalsIgnoreCase("1. Electrical and Embedded"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Electrical and Embedded**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address?","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our sales representative will connect with you","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// end Electrical and Embedded
			else if(pedts.equalsIgnoreCase("2. Electric and Future Mobility"))
			{
				if(!answers.containsKey("elec"))
				{
					question = {"name":"elec","replies":{"Hmm...you seem to be interested in **Electric and Future Mobility**","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					//response.put("questions",{question});
				}
				else
				{
					pedts = answers.get("elec").get("text");
					if(pedts.equalsIgnoreCase("Your work email address"))
					{
						if(!answers.containsKey("pedts"))
						{
							question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							dtss = answers.get("pedts").get("text");
							response.put("action","end");
							response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
							return response;
						}
					}
					else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
					{
						if(!answers.containsKey("username"))
						{
							question = {"name":"username","replies":{"Can I have your Name"}};
						}
						else
						{
							username = answers.get("username").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
								//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
							}
							else
							{
								phone = answers.get("phone").get("text");
								if(!answers.containsKey("date"))
								{
									_date1 = zoho.currentdate.addDay(2);
									_date2 = zoho.currentdate.addDay(3);
									_date3 = zoho.currentdate.addDay(4);
									slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
									question = {"name":"date","replies":{"Our sales representative will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
								}
								else
								{
									date = answers.get("date");
									if(!date.get("text").equalsIgnoreCase("-"))
									{
										meta = date.get("meta");
										card_data = meta.get("card_data");
										slot = card_data.get("value").get("slot");
										formattedDate = slot.toList("/");
										slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
										value = slot.toDateTime();
										if(!answers.containsKey("thanks"))
										{
											/* Add  event to google calendar */
											_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
											paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
											apiresponse = invokeurl
											[
												url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
												type :POST
												parameters:paramMap.toString()
												headers:{'Content-type':'application/json;'}
												connection:"test"
											];
											info apiresponse;
											if(apiresponse.containsKey("status"))
											{
												status = apiresponse.get("status");
												if("confirmed".equalsIgnoreCase(status))
												{
													response.put("action","end");
													response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
													return response;
												}
											}
											question = {"name":"thanks","replies":{"Sorry, please try later"}};
											response.put("questions",{question});
											return response;
										}
										else
										{
											response.put("action","end");
											response.put("replies",{"Have a nice day"});
											return response;
										}
									}
									else
									{
										response.put("action","end");
										response.put("replies",{"Have a nice day"});
										return response;
									}
								}
							}
						}
					}
					else
					{
						question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
					}
					// end setup meeting
				}
				response.put("questions",{question});
			}
			// end Electirc and future Mobility
		}
	}
	else if(aes_type.equals("4. Costing & Sourcing"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Costing & Sourcing","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/product-engineering-services/costing-sourcing/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Automotive Engineering Services","End Chat"}});
		}
	}
	else if(aes_type.equals("5. Business Relocation Services"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Business Relocation Services","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/relocation-services/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Automotive Engineering Services","End Chat"}});
		}
	}
	else if(aes_type.equals("Others"))
	{
		if(!answers.containsKey("elec"))
		{
			question = {"name":"elec","replies":{"Roger that! You seem to have a niche requirement…No worries, we can address it to your satisfaction...","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
			//response.put("questions",{question});
		}
		else
		{
			pedts = answers.get("elec").get("text");
			if(pedts.equalsIgnoreCase("Your work email address"))
			{
				if(!answers.containsKey("pedts"))
				{
					question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					dtss = answers.get("pedts").get("text");
					response.put("action","end");
					response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
					return response;
				}
			}
			else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
			{
				if(!answers.containsKey("username"))
				{
					question = {"name":"username","replies":{"Can I have your Name"}};
				}
				else
				{
					username = answers.get("username").get("text");
					if(!answers.containsKey("phone"))
					{
						question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
						//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
					}
					else
					{
						phone = answers.get("phone").get("text");
						if(!answers.containsKey("date"))
						{
							_date1 = zoho.currentdate.addDay(2);
							_date2 = zoho.currentdate.addDay(3);
							_date3 = zoho.currentdate.addDay(4);
							slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
							question = {"name":"date","replies":{"Our sales representative will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
						}
						else
						{
							date = answers.get("date");
							if(!date.get("text").equalsIgnoreCase("-"))
							{
								meta = date.get("meta");
								card_data = meta.get("card_data");
								slot = card_data.get("value").get("slot");
								formattedDate = slot.toList("/");
								slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
								value = slot.toDateTime();
								if(!answers.containsKey("thanks"))
								{
									/* Add  event to google calendar */
									_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
									paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
									apiresponse = invokeurl
									[
										url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
										type :POST
										parameters:paramMap.toString()
										headers:{'Content-type':'application/json;'}
										connection:"test"
									];
									info apiresponse;
									if(apiresponse.containsKey("status"))
									{
										status = apiresponse.get("status");
										if("confirmed".equalsIgnoreCase(status))
										{
											response.put("action","end");
											response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
											return response;
										}
									}
									question = {"name":"thanks","replies":{"Sorry, please try later"}};
									response.put("questions",{question});
									return response;
								}
								else
								{
									response.put("action","end");
									response.put("replies",{"Have a nice day"});
									return response;
								}
							}
							else
							{
								response.put("action","end");
								response.put("replies",{"Have a nice day"});
								return response;
							}
						}
					}
				}
			}
			else
			{
				question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
			}
			// end setup meeting
		}
		response.put("questions",{question});
	}
	// END OTHERS
	response.put("questions",{question});
}
else if(context_id.equals("dts"))
{
	dts_type = answers.get("dts_type").get("text");
	if(dts_type.equals("ERP-SAP"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Best-in-class SAP Solutions for Automotive – Improve the Efficiency","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/SAP.png","type":"links","links":{{"url":"https://www.hindujatech.com/digital-technologies/erp-sap/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Digital Technology Solutions","End Chat"}});
		}
		else
		{
			knowabout = answers.get("knowabout").get("text");
			if("Courses offered".equals(knowabout))
			{
				if(!answers.containsKey("course"))
				{
					response.put("action","reply");
					response.put("replies",{"Ah! It'sl this story.",{"text":"About Us","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/product-engineering-services/full-product-development/","text":"Organisation"}}}});
					response.put("action","end");
					response.put("action","end");
					return response;
				}
				else
				{
					course = answers.get("course").get("text");
				}
			}
		}
	}
	else if(dts_type.equals("Mobile App or Web Development"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Mobile App or Web Development","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/Digital-Services_new.jpg","type":"links","links":{{"url":"https://www.hindujatech.com/digital-technologies/digital-technology-services/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Digital Technology Solutions","End Chat"}});
		}
		else
		{
			knowabout = answers.get("knowabout").get("text");
			if("Courses offered".equals(knowabout))
			{
				if(!answers.containsKey("course"))
				{
					response.put("action","reply");
					response.put("replies",{"Ah! It'sl this story.",{"text":"About Us","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/product-engineering-services/full-product-development/","text":"Organisation"}}}});
					response.put("action","end");
					response.put("action","end");
					return response;
				}
				else
				{
					course = answers.get("course").get("text");
				}
			}
		}
	}
	else if(dts_type.equals("Advanced Technologies Solutions"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Advanced Technologies Solutions","image":"https://www.hindujatech.com/wp-content/uploads/2020/06/Slide1-1.jpg","type":"links","links":{{"url":"https://www.hindujatech.com/digital-transformation-services/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Digital Technology Solutions","End Chat"}});
		}
		else
		{
			knowabout = answers.get("knowabout").get("text");
			if("Courses offered".equals(knowabout))
			{
				if(!answers.containsKey("course"))
				{
					response.put("action","reply");
					response.put("replies",{"Ah! It'sl this story.",{"text":"About Us","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/product-engineering-services/full-product-development/","text":"Organisation"}}}});
					response.put("action","end");
					response.put("action","end");
					return response;
				}
				else
				{
					course = answers.get("course").get("text");
				}
			}
		}
	}
	else if(dts_type.equals("Advanced AI Solutions"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Advanced AI Solutions","image":"https://www.hindujatech.com/wp-content/uploads/2020/02/RELAI-LOGO-WEB_white.png","type":"links","links":{{"url":"https://www.hindujatech.com/relai/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Digital Technology Solutions","End Chat"}});
		}
		else
		{
			knowabout = answers.get("knowabout").get("text");
			if("Courses offered".equals(knowabout))
			{
				if(!answers.containsKey("course"))
				{
					response.put("action","reply");
					response.put("replies",{"Ah! It'sl this story.",{"text":"About Us","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/product-engineering-services/full-product-development/","text":"Organisation"}}}});
					response.put("action","end");
					response.put("action","end");
					return response;
				}
				else
				{
					course = answers.get("course").get("text");
				}
			}
		}
	}
	else if(dts_type.equals("Others"))
	{
		if(!answers.containsKey("elec"))
		{
			question = {"name":"elec","replies":{"Roger that! You seem to have a niche requirement…No worries, we can address it to your satisfaction...","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
			//response.put("questions",{question});
		}
		else
		{
			pedts = answers.get("elec").get("text");
			if(pedts.equalsIgnoreCase("Your work email address"))
			{
				if(!answers.containsKey("pedts"))
				{
					question = {"name":"pedts","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					dtss = answers.get("pedts").get("text");
					response.put("action","end");
					response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
					return response;
				}
			}
			else if(pedts.equalsIgnoreCase("Setup a Quick Meeting"))
			{
				if(!answers.containsKey("username"))
				{
					question = {"name":"username","replies":{"Can I have your Name"}};
				}
				else
				{
					username = answers.get("username").get("text");
					if(!answers.containsKey("phone"))
					{
						question = {"name":"phone","replies":{{"text":"Great and your work email address? ","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
						//question = {"name":"phone","replies":{"Can I have your contact number?","Our representative will call you on this number"}};
					}
					else
					{
						phone = answers.get("phone").get("text");
						if(!answers.containsKey("date"))
						{
							_date1 = zoho.currentdate.addDay(2);
							_date2 = zoho.currentdate.addDay(3);
							_date3 = zoho.currentdate.addDay(4);
							slots = {"type":"date-timeslots","label":"Schedule","tz":false,"slots":{_date1.getDay() + "/" + _date1.getMonth() + "/" + _date1.getYear():{"11:30","14:00","15:30"},_date2.getDay() + "/" + _date2.getMonth() + "/" + _date2.getYear():{"11:30","14:00","15:30"},_date3.getDay() + "/" + _date3.getMonth() + "/" + _date3.getYear():{"11:30","14:00","15:30"}},"skippable":"true"};
							question = {"name":"date","replies":{"Our sales representative will connect with you soon.","Would you like to pick a time slot as per your convenience?","Choose a suitable date and time"},"skippable":"true","input":slots};
						}
						else
						{
							date = answers.get("date");
							if(!date.get("text").equalsIgnoreCase("-"))
							{
								meta = date.get("meta");
								card_data = meta.get("card_data");
								slot = card_data.get("value").get("slot");
								formattedDate = slot.toList("/");
								slot = formattedDate.get(1) + "/" + formattedDate.get(0) + "/" + formattedDate.get(2);
								value = slot.toDateTime();
								if(!answers.containsKey("thanks"))
								{
									/* Add  event to google calendar */
									_date = value.getYear().toString() + "-" + value.getMonth().toString() + "-" + value.getDay().toString() + "T" + value.getHour().toString() + ":" + value.getMinutes().toString() + ":" + value.getSeconds().toString();
									paramMap = {"start":{"dateTime":_date,"timeZone":"Asia/Kolkata"},"end":{"dateTime":_date,"timeZone":"Asia/Kolkata"},'summary':'Call with ' + username + '. Mail Id : ' + phone};
									apiresponse = invokeurl
									[
										url :"https://www.googleapis.com/calendar/v3/calendars/primary/events"
										type :POST
										parameters:paramMap.toString()
										headers:{'Content-type':'application/json;'}
										connection:"test"
									];
									info apiresponse;
									if(apiresponse.containsKey("status"))
									{
										status = apiresponse.get("status");
										if("confirmed".equalsIgnoreCase(status))
										{
											response.put("action","end");
											response.put("replies",{"Your appointment has been scheduled with our Sales rep on" + slot,"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
											return response;
										}
									}
									question = {"name":"thanks","replies":{"Sorry, please try later"}};
									response.put("questions",{question});
									return response;
								}
								else
								{
									response.put("action","end");
									response.put("replies",{"Have a nice day"});
									return response;
								}
							}
							else
							{
								response.put("action","end");
								response.put("replies",{"Have a nice day"});
								return response;
							}
						}
					}
				}
			}
			else
			{
				question = {"name":"elec","replies":{"Sorry didn't get you,","Select from following","We could start on it by contacting you through"},"suggestions":{"Your work email address","Setup a Quick Meeting"}};
			}
			// end setup meeting
		}
		response.put("questions",{question});
	}
	// END OTHERS
}
// dts END
else if(context_id.equals("quotation"))
{
	aes_type = answers.get("quotation_type").get("text");
	if(aes_type.equals("Sales Inquiry Link"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Sales Inquiry Link","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/contact-hinduja","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Continue."}});
		}
	}
}
// END Would you like a quotation for a service?
else if(context_id.equals("partnering"))
{
	partnering_type = answers.get("partnering_type").get("text");
	if(partnering_type.equals("Our Succesful Collaborations"))
	{
		if(!answers.containsKey("knowabout"))
		{
			response.put("action","reply");
			response.put("replies",{"",{"text":"Our Succesful Collaborations","image":"https://www.hindujatech.com/wp-content/uploads/2019/06/segment_we_cater_banner_final.png","type":"links","links":{{"url":"https://www.hindujatech.com/partnership-ecosystem/","text":"Visit Page"}}}});
			response.put("input",{"type":"select","options":{"Continue"}});
		}
	}
}
// END Partnering With Hinduja Tech
else if(context_id.equals("query"))
{
	query = answers.get("query").get("text");
	response.put("action","end");
	response.put("replies",{"Thank you! Our staff will contact you soon with additional information","Bye,have a great day ahead!"});
	return response;
}
return response;