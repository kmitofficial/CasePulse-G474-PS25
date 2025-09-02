#  Case Bridge

## 📖 Introduction  
CaseBridge is a research-driven system built to advance the state of legal information retrieval and summarization. Inspired by the CLERC benchmark, CaseBridge is designed to process large-scale case law corpora and provide accurate, explainable, and efficient retrieval of relevant passages. Beyond retrieval, the system aspires to generate concise and accessible case summaries that can significantly aid legal professionals, students, and researchers in navigating complex judicial texts. By combining traditional sparse retrieval methods with dense neural representations, CaseBridge aims to bridge the gap between raw case law data and usable legal insights.

## 🎯 Purpose and Users  
The primary purpose of CaseBridge is to create a unified framework for case retrieval and summarization. For legal practitioners and researchers, the challenge is not only to locate the most relevant precedents but also to synthesize them into clear arguments. CaseBridge addresses both needs: it retrieves relevant passages from millions of documents and summarizes them into digestible briefs. Its target users include lawyers seeking case precedents, law students conducting academic research, policy analysts examining legal patterns, and developers working at the intersection of law and artificial intelligence.

## 🏗️ Architecture Diagram  
![Architecture Diagram](assets/Architecture.png)  

## 🔄 Workflow  
![Workflow Diagram](assets/Workflow.png)  

## 📚 Reference Research Paper Summary  
CaseBridge is grounded in the research presented in *CLERC: A Benchmark for Legal Case Retrieval and Summarization*. The CLERC benchmark introduces a large-scale dataset of over twenty-three million passages extracted from U.S. case law and establishes evaluation protocols for both retrieval and summarization. In this benchmark, dense retrieval using LegalBERT-CLERC achieved a recall of 68% at 1000, while BM25 achieved a recall of 48%. Summarization tasks were evaluated on the ability to produce concise briefs reflective of professional legal summaries. CaseBridge builds on these findings by re-implementing retrieval pipelines, optimizing them for memory efficiency, and extending the framework toward a practical system that integrates summarization with retrieval in a real-world setting.

## 👥 Contributors  
The CaseBridge project has been made possible through the collaborative efforts of a dedicated team. Each contributor has focused on different aspects of the system, from retrieval implementation and evaluation to user interface design and presentation milestones.

| Name              | First Milestone PPT | First Milestone Video | Second Milestone PPT | Second Milestone Video |
|-------------------|---------------------|-----------------------|-----------------------|-------------------------|
| B Charan Reddy    | [PPT](assets/charan/MileStone1.pdf) | Coming soon | Coming soon | Coming soon |
| Mahesh Nampally   | [PPT](assets/mahesh/MileStone1.pdf) | [MS1](https://youtu.be/Cast3BBNybU) | Coming soon | Coming soon |
| Nikhilesh Nilagiri| [PPT](assets/nikhilesh/MileStone1.pdf)| [MS1](https://drive.google.com/file/d/1IKfpau7zXHs9iEbhpfpAmB9ptxVB7gBD/view?usp=drivesdk) | Coming soon | Coming soon |
| P Hrithik Raj     | [PPT](assets/hrithik/MileStone1.pdf) | [MS1](https://youtu.be/OM9up2UylJI) | Coming soon | Coming soon |
| T Akshaya         | [PPT](assets/akshaya/MileStone1.pdf) | Coming soon | Coming soon | Coming soon |
