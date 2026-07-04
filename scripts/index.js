//preencher o ano de copyright dinamicamente
const currentYearElement = document.querySelector("#currentyear");
const today = new Date();
currentYearElement.textContent = today.getFullYear();

//preencher a data da última modificação
const lastModifiedElement = document.querySelector("#lastModified");
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    }
]

// ==========================================
// 3. MENU HAMBÚRGUER RESPONSIVO
// ==========================================
const hamBtn = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

hamBtn.addEventListener("click", () => {
    navBar.classList.toggle("show");
    hamBtn.classList.toggle("show");
});

// ==========================================
// 4. RENDERIZAÇÃO DINÂMICA E FILTRAGEM
// ==========================================
const coursesContainer = document.querySelector(".courses-container");
const creditsCountElement = document.querySelector("#credits-count");

// Função principal para criar e exibir os cards na tela
function displayCourses(filteredCourses) {
    // Limpa o container para não duplicar dados
    coursesContainer.innerHTML = "";

    filteredCourses.forEach(course => {
        // Cria uma div para o card do curso
        const card = document.createElement("div");
        
        // Adiciona as classes necessárias para estilização
        card.className = `course-card ${course.subject.toLowerCase()}`;
        
        // Verifica se o curso foi concluído para aplicar a classe de destaque
        if (course.completed) {
            card.classList.add("completed");
        }

        // Define o conteúdo interno do card (Apenas a sigla e o número, como no wireframe)
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        
        // Adiciona o card ao container na página
        coursesContainer.appendChild(card);
    });

    // Calcula a soma dos créditos dinamicamente usando reduce()
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsCountElement.textContent = totalCredits;
}

// ==========================================
// 5. EVENTOS DOS BOTÕES DE FILTRO
// ==========================================
const filterAll = document.querySelector("#filter-all");
const filterCse = document.querySelector("#filter-cse");
const filterWdd = document.querySelector("#filter-wdd");

// Função auxiliar para mudar a classe "active" entre os botões
function setActiveButton(activeBtn) {
    [filterAll, filterCse, filterWdd].forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

// Ouvintes de clique para filtrar o array original
filterAll.addEventListener("click", () => {
    setActiveButton(filterAll);
    displayCourses(courses); // Mostra tudo
});

filterCse.addEventListener("click", () => {
    setActiveButton(filterCse);
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses); // Mostra apenas CSE
});

filterWdd.addEventListener("click", () => {
    setActiveButton(filterWdd);
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses); // Mostra apenas WDD
});

// Renderização automática ao carregar a página pela primeira vez
displayCourses(courses);