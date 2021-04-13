---
layout: default
title: Market Resolution Rules
parent: Omen
grand_parent: Products

---

# Omen Market Resolution Rules
{: .no_toc }

___

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Invalid Markets 

The outcome of the market **must be known** by its Resolution Date. If the outcome is not known by the resolution date, whether it is due to a wrong setting of the resolution date or an unexpected event delaying the knowledge of the result, the market will resolve as invalid. 
- **Valid**: “*Will Trump get reelected in the 2020 United States presidential election?”* with 2021-11-06 as a resolution date. 

- **Invalid**: “*Will Trump get reelected in the 2020 United States presidential election?”* with 02/11/2020 as a resolution date. *(assuming the election process is kept as initially planned)*.

Questions with **relative dates** will resolve as invalid. 

- **Invalid**: *Who will be the president of the United States in 6 months? (“in 6 months depends on the current time”)*. 

Questions about **moral values and not facts** will be resolved as invalid. 

- **Invalid**: *“Is it ethical to eat meat?”*. 

Questions in which **none of the answers are valid** will resolve as invalid. 

- **Invalid**: “*What is the result of 1+1?” with the outcomes “0” and “1”*. 

Questions in which **multiple answers are valid** will resolve as invalid. 

- **Invalid**: *“Who will be the Time person of the year 1937?” with answers “Chiang Kai-shek” and “Soong Mei-ling” (they got the prize jointly).* 

The market should **not** directly incentivize **immoral violent actions** *(such as murder, rape or unjust imprisonment)* which could likely be performed by any participant. 

- **Invalid**: *"Will Donald Trump be alive on the 01/12/2021?" (Anyone could bet on “No” and kill him for a guaranteed profit. Anyone could bet on “Yes” to effectively put a bounty on his head)*. 

- **Invalid**: *"Will Hera be a victim of swatting in 2020?" (Anyone could falsely call the emergency services on him in order to win the bet)* 

This does not prevent markets: 

 - Whose topics are violent events **not** caused by conscious beings. 
 
    - **Valid**: *How many people will die from COVID19 in 2020? (Viruses don’t use prediction markets)*. 

  - Whose main source of uncertainty is **not** related to a potential violent action. 
  
      -  **Valid**: *Will Trump win the 2020 US presidential election? (The main source of uncertainty is the vote of US citizens, not a potential murder of a presidential candidate)*. 

  - Which could give an incentive only to specific participants to commit an immoral violent action, but are in practice **unlikely**. 
  
      -  **Valid**: *Will the US be engaged in a military conflict with a UN member state in 2021? (It’s unlikely for the US to declare war in order to win a bet on this market)*. 
      
    -   **Valid**: *Will Derek Chauvin go to jail for the murder of George Flyod? (It’s unlikely that the jurors would collude to make a wrong verdict in order to win this market)*. 

## Default assumptions 

Market creators are encouraged to make their markets as clear as possible. However in order to avoid insufficiently precise markets to resolve as invalid, the following assumptions shall be made: 

- All dates default to **UTC with the 24h clock**. 
    - **Ex**: *“Will Ethereum 2.0 be launched before the 2030-01-01?”* will be interpreted as *“Will Ethereum 2.0 be launched before 2030-01-01 00:00 UTC?”*. 

- Dates using “/” are assumed to be written in the **DD/MM/YYYY or DD/MM/YY** format. In case centuries are omitted (DD/MM/YY), centuries are assumed to be the same as the resolution time. 
    - **Ex**: *“Will Ethereum 2.0 be launched before the 01/01/30?”* will be interpreted as *“Will Ethereum 2.0 be launched before the 1st January 2030” (assuming the resolution date is in the 21th century)*. 

- If no specific event date is given in a question, it is assumed that the resolution date will be considered the **event date**. 
    - **Ex**: *“Will there be a human living on Mars?”* With a resolution date of 01/01/2030 will be interpreted as *“Will there be a human living on Mars on 01/01/2030?”*. 

- Entities are assumed to reference the **most obvious entity** with that name, taking the context into account. 
    - **Ex**: *“Will Michael Jordan receive the 2021 Turing award?”* refers to the computer scientist Michael I. Jordan whereas *“How many points will Michael Jordan score in the FIBA Americas Championship?”* refers to Michael J. Jordan, the basketball player. 

- In case units are omitted, they are assumed to be the **units which are the most often used** in this particular situation. 
  - **Ex**: *“Will a NFT be sold for more than one million in 2021?”* will be interpreted as *“Will a NFT be sold for more than 1 000 000 USD in 2021?”*. 

- If no specific rounding method is given, values are to be **rounded to the nearest proposed value or range**, middle toward 0. 
    - **Ex**: *With choices -100, 0 and 100. 77->100, 50->0, -50 -> 0*. 
    
    - **Ex**: *With choices A: 0-2, B: 3-5 and C: 6+. 1->A, 8->C, 5.5->B, 2.2->A*. 

## Resolving unclear questions 

In general, if the market does not break a rule of the Invalid Market section, reasonable efforts should be made to determine its outcome even if the question is not 100% technically perfect. 

- If the market contains some grammar or orthographic errors, it should resolve as if it **didn’t contain those errors**, as long as the meaning of the question is still clear. 
    - **Ex**: *“Will Donald `Treump` win the US presidential election?”* should resolve in the same manner as *“Will Donald `Trump` win the US presidential election?”*. 

- If the question makes an assumption which appears to be incorrect, it should resolve as if this assumption **hasn’t been made**, as long as the meaning of the question is still clear. 
    - **Ex**: *“Will Vitalik tweet about Omen by Wednesday, July 7, 2020?”* with July 8th as a resolution date should resolve in the same manner as *“Will Vitalik tweet about Omen by July 7, 2020?”*, even if July 7, 2020 is actually a Tuesday. 
    
    - **Ex**: *“Will president Kim Jong-un publicly announce a direct military action against the US?”* should resolve in the same manner as *“Will Kim Jong-un publicly announce a direct military action against the US?”* even if Kim Jong-un is the supreme leader of North Korea but not its president (the official president of North Korea is Kim Il-sung despite him being dead). 

- If the market doesn’t mention a specific source, the **most credible outcome** should be reported. In order to determine the credibility of an outcome, the quantity of sources and their credibility are to be taken into account. Credibility of sources and of outcomes should be assessed according to facts, not unproven beliefs. 

  - **Ex**: *“Will extraterrestrial lifeforms visit planet earth?”* will resolve to No, unless a number of credible sources announce it, despite some people reporting having experienced such encounters.   
    
  - **Ex**: *“How many people will die of COVID19 in 2020?”* should be answered according to numbers reported by renowned health organisations and not according to some public figures claiming COVID19 to be a hoax. 

- If a market can have different interpretations, but all those interpretations lead to the same outcome, **this outcome should be reported**. If no interpretation is clearly more reasonable than the others, the market should be reported as invalid. 

    - **Ex**: *“Which party will win the October 2012 Czeck elections?”* Should be reported as *“Czech Social Democratic Party”*. Even if there were both senatorial and regional elections at the same date and the election the question refers to is ambiguous, the *“Czech Social Democratic Party”* won both of them. 

    - **Ex**: *“Which party will win the October 2015 Czech elections?”* Should be reported as invalid because *“Christian and Democratic Union – Czechoslovak People's Party”* won the senatorial election but *“ANO 2011”* won the regional ones. 

- The fact that multiple outcomes could be valid at the same time does **not** make the question invalid if **only one** of those outcomes occurs. 

    - **Ex**: *“How many seats will the European Pirate Party win in the 2014 European elections?”* with answers *“0”*, *“1-10”* and *“10+”* will only be invalid if the pirate party wins exactly 10 seats.git