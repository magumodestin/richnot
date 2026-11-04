const PLACEHOLDER_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const topic = (title, file = PLACEHOLDER_PDF) => ({ title, file });

const modules = {
    DFS101: {
        name: "Database Systems",
        code: "Database Systems 621",
        topics: [
            topic("Introduction to DBMS", "https://courses.cs.vt.edu/cs4604/Spring21/pdfs/1-intro.pdf"),
            topic("SQL Queries", "https://cdncontribute.geeksforgeeks.org/wp-content/uploads/SQL-Manual.pdf"),
            topic("Normalization", "PDFs/DBS621 Lecture 11.pdf"),
            topic("ER Diagrams", "PDFs/DBS621 Lecture 9.pdf"),
            topic("Study Guide", "PDFs/2025 DBS622B Study Guide.pdf")
        ]
    },
    NET202: {
        name: "Networking",
        code: "Networks 511",
        topics: [
            topic("Networking Basics", "https://www.imdpune.gov.in/training/networking/Network.pdf"),
            topic("OSI Model", "https://uomustansiriyah.edu.iq/media/lectures/6/6_2019_04_11!09_52_16_PM.pdf"),
            topic("IP Addressing", "https://people.cs.umass.edu/~arun/cs491g/lectures/IPAddr-Lab2.pdf"),
            topic("Routing & Switching", "https://www.viavisolutions.com/en-us/literature/aion-routing-and-switching-bundle-data-sheets-en.pdf"),
            topic("Study Guide", "PDFs/Networks 511 2021.pdf")
        ]
    },
    PYT310: {
        name: "Python Programming",
        code: "Programming 511",
        topics: [
            topic("Variables & Data Types", "https://germanna.edu/sites/default/files/2022-03/Python%20-%20Variables%20and%20Data%20Types.pdf"),
            topic("Loops & Functions", "https://www.purdue.edu/hla/sites/varalalab/wp-content/uploads/sites/20/2018/04/Lecture_11.pdf"),
            topic("Lists & Dictionaries", "https://www.purdue.edu/hla/sites/varalalab/wp-content/uploads/sites/20/2018/03/Lecture_10.pdf"),
            topic("File Handling", "https://ncert.nic.in/textbook/pdf/lecs102.pdf"),
            topic("Study Guide", "PDFs/PROGRAMMING 511 STUDY GUIDE (PYTHON).pdf")
        ]
    },
    BCM201: {
        name: "Business Communication",
        code: "Business Communication 500",
        topics: [
            topic("Topic 1 Slides", "PDFs/Business Communication Topic 1 Slide.pptx"),
            topic("Topic 2 Slides", "PDFs/Business Communication Topic 2 Slide.pptx"),
            topic("Topic 4 Slides", "PDFs/Business Communication Topic 4 slides.pptx"),
            topic("Topic 5 Slides", "PDFs/Business Communication Topic 5 slides.pptx"),
            topic("Study Guide", "PDFs/Business Communication 500.pdf")
        ]
    },
    ISY301: {
        name: "Information Systems",
        code: "Information Systems 621",
        topics: [
            topic("Types of Information Systems"),
            topic("System Analysis"),
            topic("Data & Decision Making"),
            topic("IS Security"),
            topic("Study Guide", "PDFs/2026 Information Systems 621 - Study Guide part2.pdf")
        ]
    }
};

