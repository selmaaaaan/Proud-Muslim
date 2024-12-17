document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.querySelector(".messages");
    const plane = document.getElementById("plane-animation");
  
    const answers = {
      "Does Islam promote terrorism?": "Islam unequivocally condemns terrorism and the killing of innocent people. The Qur'an clearly states: 'Whoever kills an innocent person, it is as if they have killed all of humanity.' Terrorist groups that misuse the term Islam to justify violence are misinterpreting the religion's core principles of peace and justice.",
      
      "Why does Islam allow practices like jihad, and does it mean 'holy war'?": "The concept of 'Jihad' in Islam is often misunderstood. Jihad means striving or struggling in the way of God. While it can refer to personal struggles and striving for justice, armed Jihad is only permitted in very specific circumstances, such as self-defense. It is regulated by strict ethical guidelines, and the term 'holy war' is a narrow and misleading interpretation.",
      
      "Does Islam suppress women’s rights?": "Islam granted women rights over 1,400 years ago, including the right to own property, inherit, seek education, and choose their spouse. While interpretations and cultural practices vary, Islam promotes dignity, equality, and the full participation of women in all aspects of life.",
      
      "Why is Islam associated with harsh punishments under Shariah?": "Shariah law is often misunderstood. While it includes punishments for certain crimes, these are rare, highly regulated, and only applied under strict conditions. Shariah's ultimate aim is justice, fairness, and rehabilitation. Most Muslim-majority countries do not implement these punishments, and there is ongoing discussion about how Shariah should be applied today.",
      
      "Can Muslims coexist with non-Muslims?": "Islam promotes peaceful coexistence and mutual respect with people of all faiths. The Qur'an encourages peaceful dialogue and collaboration. Many Muslims live harmoniously with non-Muslims in diverse societies worldwide, contributing to their communities while upholding their faith.",
      
      "Why is Islam perceived as anti-modern or backward?": "Islam values knowledge, progress, and the pursuit of wisdom. The perception of Islam as anti-modern often arises from political and cultural misunderstandings. In reality, many Islamic principles align with modern values such as social justice, education, and scientific discovery.",
      
      "Why is Islam linked with oppression in Muslim-majority countries?": "Oppression in some Muslim-majority countries is more related to political and cultural factors rather than Islam itself. Many of these societies face authoritarian governments or historical challenges, which may result in human rights violations that are not consistent with Islamic teachings.",
      
      "Why does Islam promote practices like polygamy?": "Polygamy is permitted in Islam but regulated strictly under conditions of fairness and justice. A man may marry up to four women only if he can treat them equally. It is not a requirement but an option under specific circumstances, and it is not widely practiced today in many Muslim-majority countries.",
      
      "Why are there restrictions on freedom of speech in Islam?": "Islam recognizes the value of speech but also emphasizes responsibility. Freedom of speech in Islam comes with the duty to avoid spreading lies, harm, or hate. Speech that causes division or harms individuals or communities is discouraged, and Islamic teachings stress the importance of truth and respect for others.",
      
      "Does Islam oppose LGBTQ+ rights?": "Islamic views on LGBTQ+ rights are diverse. Traditional interpretations often prohibit same-sex relations, viewing them as sinful. However, there are modern voices within the Muslim community advocating for a more compassionate and inclusive approach, calling for a reinterpretation of religious texts in light of contemporary understandings of sexuality and human rights.",
      
      "Why are Muslims accused of not integrating into Western societies?": "The accusation often comes from cultural misunderstandings and political narratives. Muslims in Western societies contribute significantly to their communities, but integration can be hindered by discrimination, racial profiling, and challenges in balancing religious identity with societal expectations. Islam encourages Muslims to engage with their societies while maintaining their faith and values.",
      
      "What is Love Jihad, and is it supported by Islam?": "'Love Jihad' is a politically charged term used to describe alleged efforts by Muslim men to convert non-Muslim women by forming relationships with them. It is a baseless accusation and has no support in Islamic teachings. Islam emphasizes the importance of consent, mutual respect, and ethical behavior in relationships, and forced conversions or deceptive practices are not supported.",
    };
  
    const simulateTyping = (text, isBot) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", isBot ? "incoming" : "outgoing");
      const paragraph = document.createElement("p");
      messageElement.appendChild(paragraph);
  
      chatbox.appendChild(messageElement);
      chatbox.scrollTop = chatbox.scrollHeight;
  
      let i = 0;
      const typingInterval = setInterval(() => {
        paragraph.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(typingInterval);
      }, 50);
    };
  
    const flyPlane = (buttonElement) => {
      const buttonRect = buttonElement.getBoundingClientRect();
      const chatboxRect = chatbox.getBoundingClientRect();
      const planeX = buttonRect.left + window.scrollX;
      const planeY = buttonRect.top + window.scrollY;

      plane.style.left = `${planeX}px`;
      plane.style.top = `${planeY}px`;
  
      plane.classList.add("animate-plane");
  
      setTimeout(() => {
        plane.classList.remove("animate-plane");
      }, 1000);
    };
  
    window.sendQuestion = (question) => {
      const buttons = document.querySelectorAll("button");
      const buttonClicked = Array.from(buttons).find(button => button.value === question);
  
      if (answers[question]) {
        simulateTyping(question, false);
        flyPlane(buttonClicked); 
  
        setTimeout(() => simulateTyping(answers[question], true), 1000); // Bot answer
      }
    };
  });
  window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        
        document.getElementById("chat-container").style.display = "flex";
      }, 2600); 
  });
  