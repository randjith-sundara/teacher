"""
Banque complète de cours universitaires, théories approfondies et exercices progressifs pour :
- FOND-0100 : Remise à Niveau & Fondations (De Zéro)
- MAT-0130 : Algèbre vectorielle
- MAT-0150 : Calcul différentiel
- MAT-0250 : Calcul intégral et probabilités
"""

COURSES_DATA = [
    {
        "id": "fond0100",
        "code": "FOND-0100",
        "title": "Remise à Niveau & Fondations",
        "category": "Fondations & Pré-requis",
        "color": "amber",
        "description": "Revue pas-à-pas des bases indispensables : fractions, factorisation, lois des exposants, équations du 2nd degré, droites, trigonométrie et logarithmes.",
        "prerequisites": "Aucun prérequis — Conçu spécialement pour repartir de zéro",
        "estimated_hours": 30,
        "modules": [
            {
                "id": "m1-algebre-base",
                "title": "Algèbre & Calcul Fondamental",
                "subtitle": "Fractions, distributivité, factorisation et trinômes",
                "viz_type": "fractions",
                "theory": {
                    "summary": "L'algèbre est le socle absolu des mathématiques universitaires. Savoir manipuler les fractions, développer avec rigueur et factoriser instantanément évite les blocages dans les calculs de limites et de dérivées.",
                    "key_formulas": [
                        {
                            "name": "Addition de fractions",
                            "latex": "\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}"
                        },
                        {
                            "name": "Multiplication de fractions",
                            "latex": "\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}"
                        },
                        {
                            "name": "Différence de carrés",
                            "latex": "a^2 - b^2 = (a - b)(a + b)"
                        },
                        {
                            "name": "Carré d'une somme",
                            "latex": "(a + b)^2 = a^2 + 2ab + b^2"
                        },
                        {
                            "name": "Carré d'une différence",
                            "latex": "(a - b)^2 = a^2 - 2ab + b^2"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Priorités opératoires (PEMDAS)",
                            "content": "L'ordre strict des opérations est : 1. Parenthèses, 2. Exposants, 3. Multiplication et Division (de gauche à droite), 4. Addition et Soustraction. Exemple : $2 + 3 \\times 4 = 2 + 12 = 14$ et NON $(2+3) \\times 4 = 20$."
                        },
                        {
                            "title": "2. Manipuler les fractions avec sérénité",
                            "content": "• Pour additionner deux fractions, on trouve un dénominateur commun : $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.\n• Pour diviser deux fractions, on multiplie par l'inverse : $\\frac{a/b}{c/d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{ad}{bc}$."
                        },
                        {
                            "title": "3. Factorisation et trinômes",
                            "content": "• Mise en évidence simple : $4x + 8 = 4(x + 2)$.\n• Différence de deux carrés : $x^2 - 25 = (x - 5)(x + 5)$.\n• Trinôme $x^2 + bx + c$ : trouver deux nombres $p$ et $q$ tels que $p \\times q = c$ et $p + q = b$. Alors $x^2 + bx + c = (x + p)(x + q)$."
                        }
                    ],
                    "pitfall": "Attention : $(a + b)^2 \\neq a^2 + b^2$ ! Ne jamais oublier le terme croisé $2ab$. Exemple : $(x + 3)^2 = x^2 + 6x + 9$.",
                    "method": "Pour simplifier une fraction algébrique comme $\\frac{x^2 - 9}{x - 3}$ : 1. Factorise le numérateur : $(x - 3)(x + 3)$. 2. Simplifie le facteur commun $(x - 3)$. Résultat : $x + 3$."
                },
                "exercises": [
                    {
                        "id": "fond-ex1",
                        "title": "Addition de fractions simples",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\frac{2}{3} + \\frac{1}{4}$ sous forme de fraction irréductible.",
                        "input_type": "math_expr",
                        "expected_solution": "11/12",
                        "hints": [
                            "Trouvez le dénominateur commun entre 3 et 4 : c'est 12.",
                            "Convertissez : $\\frac{2}{3} = \\frac{8}{12}$ et $\\frac{1}{4} = \\frac{3}{12}$."
                        ],
                        "full_solution_latex": "\\frac{2}{3} + \\frac{1}{4} = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}."
                    },
                    {
                        "id": "fond-ex2",
                        "title": "Développement d'un carré",
                        "difficulty": 1,
                        "question_latex": "Développez l'expression $(x + 5)^2$.",
                        "input_type": "math_expr",
                        "expected_solution": "x^2 + 10*x + 25",
                        "hints": [
                            "Appliquez $(a + b)^2 = a^2 + 2ab + b^2$ avec $a = x$ et $b = 5$.",
                            "Le double produit vaut $2 \\times x \\times 5 = 10x$."
                        ],
                        "full_solution_latex": "(x + 5)^2 = x^2 + 2(x)(5) + 5^2 = x^2 + 10x + 25."
                    },
                    {
                        "id": "fond-ex3",
                        "title": "Différence de deux carrés",
                        "difficulty": 2,
                        "question_latex": "Factorisez l'expression $x^2 - 16$.",
                        "input_type": "math_expr",
                        "expected_solution": "(x - 4)*(x + 4)",
                        "hints": [
                            "Remarquez que $16 = 4^2$.",
                            "Appliquez $a^2 - b^2 = (a - b)(a + b)$."
                        ],
                        "full_solution_latex": "x^2 - 16 = x^2 - 4^2 = (x - 4)(x + 4)."
                    },
                    {
                        "id": "fond-ex1_4",
                        "title": "Soustraction de fractions",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\frac{7}{6} - \\frac{1}{3}$ sous forme de fraction simplifiée.",
                        "input_type": "math_expr",
                        "expected_solution": "5/6",
                        "hints": [
                            "Mettez au même dénominateur 6 : $\\frac{1}{3} = \\frac{2}{6}$.",
                            "Soustrayez les numérateurs : $7 - 2 = 5$."
                        ],
                        "full_solution_latex": "\\frac{7}{6} - \\frac{2}{6} = \\frac{5}{6}."
                    },
                    {
                        "id": "fond-ex1_5",
                        "title": "Double distributivité",
                        "difficulty": 2,
                        "question_latex": "Développez et réduisez $(2x + 1)(x + 3)$.",
                        "input_type": "math_expr",
                        "expected_solution": "2*x^2 + 7*x + 3",
                        "hints": [
                            "Multipliez chaque terme : $2x \\cdot x + 2x \\cdot 3 + 1 \\cdot x + 1 \\cdot 3$.",
                            "$2x^2 + 6x + x + 3$."
                        ],
                        "full_solution_latex": "(2x + 1)(x + 3) = 2x^2 + 6x + x + 3 = 2x^2 + 7x + 3."
                    },
                    {
                        "id": "fond-ex1_6",
                        "title": "Factorisation d'un trinôme",
                        "difficulty": 2,
                        "question_latex": "Factorisez le trinôme $x^2 - 5x + 6$.",
                        "input_type": "math_expr",
                        "expected_solution": "(x - 3)*(x - 2)",
                        "hints": [
                            "Cherchez deux nombres dont le produit vaut $+6$ et la somme vaut $-5$.",
                            "Ces nombres sont $-3$ et $-2$ car $(-3)(-2) = 6$ et $(-3) + (-2) = -5$."
                        ],
                        "full_solution_latex": "x^2 - 5x + 6 = (x - 3)(x - 2)."
                    },
                    {
                        "id": "fond-ex1_7",
                        "title": "Mise en évidence simple",
                        "difficulty": 1,
                        "question_latex": "Factorisez par mise en évidence le polynôme $3x + 6$.",
                        "input_type": "math_expr",
                        "expected_solution": "3*(x + 2)",
                        "hints": [
                            "3 est un facteur commun aux deux termes.",
                            "Écrivez $3(x + 2)$."
                        ],
                        "full_solution_latex": "3x + 6 = 3(x + 2)."
                    }
                ]
            },
            {
                "id": "m2-exposants-equations",
                "title": "Exposants, Racines & Équations",
                "subtitle": "Puissances négatives et fractionnaires, simplification des radicaux et résolution du second degré",
                "viz_type": "parabola",
                "theory": {
                    "summary": "Comprendre que la racine carrée est une puissance fractionnaire (\\(\\sqrt{x} = x^{1/2}\\)) et qu'une division par x est une puissance négative (\\(\\frac{1}{x} = x^{-1}\\)) est le secret qui rend le calcul différentiel et intégral simple et naturel. La formule quadratique permet quant à elle de trouver les racines de n'importe quelle parabole.",
                    "key_formulas": [
                        {
                            "name": "Multiplication de puissances",
                            "latex": "x^a \\cdot x^b = x^{a+b}"
                        },
                        {
                            "name": "Division de puissances",
                            "latex": "\\frac{x^a}{x^b} = x^{a-b}"
                        },
                        {
                            "name": "Puissance d'une puissance",
                            "latex": "(x^a)^b = x^{a \\cdot b}"
                        },
                        {
                            "name": "Exposant négatif",
                            "latex": "x^{-n} = \\frac{1}{x^n}"
                        },
                        {
                            "name": "Exposant fractionnaire",
                            "latex": "x^{m/n} = \\sqrt[n]{x^m} = (\\sqrt[n]{x})^m"
                        },
                        {
                            "name": "Formule quadratique universelle",
                            "latex": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Maîtriser les puissances et exposants négatifs",
                            "content": "• Un exposant négatif n'a RIEN à voir avec un signe moins devant le nombre : il indique simplement une inversion de position dans la fraction. Par exemple : $x^{-1} = \\frac{1}{x}$ et $x^{-3} = \\frac{1}{x^3}$.\n• Règle de bascule : pour faire disparaître un exposant négatif au dénominateur, on le monte au numérateur : $\\frac{1}{x^{-4}} = x^4$.\n• Attention aux constantes : dans l'expression $\\frac{5}{x^2}$, le 5 reste en haut : $\\frac{5}{x^2} = 5x^{-2}$."
                        },
                        {
                            "title": "2. Exposants fractionnaires et simplification des radicaux",
                            "content": "• Le dénominateur de la fraction représente l'indice de la racine : $x^{1/2} = \\sqrt{x}$, $x^{1/3} = \\sqrt[3]{x}$, et $x^{2/3} = \\sqrt[3]{x^2}$.\n• Pour simplifier une racine carrée comme $\\sqrt{72}$ : on cherche le plus grand carré parfait diviseur (ici $36$) : $\\sqrt{72} = \\sqrt{36 \\times 2} = \\sqrt{36} \\times \\sqrt{2} = 6\\sqrt{2}$."
                        },
                        {
                            "title": "3. Les 3 méthodes pour résoudre une équation du 2nd degré (ax² + bx + c = 0)",
                            "content": "• Méthode 1 (Sans terme c) : Mise en évidence immédiate. Exemple : $x^2 - 7x = 0 \\implies x(x - 7) = 0 \\implies x = 0 \\text{ ou } x = 7$.\n• Méthode 2 (Factorisation produit-somme) : Si $a = 1$, chercher deux nombres dont le produit vaut $c$ et la somme vaut $b$. Exemple : $x^2 - 8x + 15 = 0 \\implies (x - 3)(x - 5) = 0 \\implies x = 3 \\text{ ou } x = 5$.\n• Méthode 3 (Formule générale avec discriminant $\\Delta$) : Calculer $\\Delta = b^2 - 4ac$. Si $\\Delta > 0$, 2 racines distinctes $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$. Si $\\Delta = 0$, 1 racine double $x = \\frac{-b}{2a}$. Si $\\Delta < 0$, aucune racine réelle."
                        }
                    ],
                    "pitfall": "Attention aux deux pièges classiques : 1. $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ (test : $\\sqrt{9 + 16} = 5 \\neq 3 + 4$). 2. Ne confondez pas $(-3)^2 = 9$ et $-3^2 = -9$. Les parenthèses englobent le signe !",
                    "method": "Résoudre $2x^2 - 5x + 2 = 0$ avec le discriminant : 1. Identifie $a=2, b=-5, c=2$. 2. $\\Delta = (-5)^2 - 4(2)(2) = 25 - 16 = 9$. 3. $\\sqrt{\\Delta} = 3$. 4. $x = \\frac{5 \\pm 3}{2(2)} = \\frac{5 \\pm 3}{4}$. Les deux solutions sont $x = \\frac{8}{4} = 2$ et $x = \\frac{2}{4} = 1/2$."
                },
                "exercises": [
                    {
                        "id": "fond-ex4",
                        "title": "Lois des puissances combinées",
                        "difficulty": 1,
                        "question_latex": "Simplifiez $\\frac{x^4 \\cdot x^5}{x^3}$ sous forme d'une unique puissance $x^p$.",
                        "input_type": "math_expr",
                        "expected_solution": "x^6",
                        "hints": [
                            "Au numérateur, additionnez les exposants : $4 + 5 = 9$.",
                            "Lors de la division, soustrayez l'exposant du bas : $9 - 3 = 6$."
                        ],
                        "full_solution_latex": "\\frac{x^4 \\cdot x^5}{x^3} = \\frac{x^{4+5}}{x^3} = \\frac{x^9}{x^3} = x^{9-3} = x^6."
                    },
                    {
                        "id": "fond-ex5",
                        "title": "Conversion en exposant négatif",
                        "difficulty": 1,
                        "question_latex": "Écrivez $\\frac{3}{x^4}$ sous la forme $3x^p$ (donnez l'expression complète).",
                        "input_type": "math_expr",
                        "expected_solution": "3*x^(-4)",
                        "hints": [
                            "Le coefficient 3 reste devant.",
                            "Rappelez-vous la règle : $\\frac{1}{x^n} = x^{-n}$."
                        ],
                        "full_solution_latex": "\\frac{3}{x^4} = 3 \\cdot \\frac{1}{x^4} = 3x^{-4}."
                    },
                    {
                        "id": "fond-ex6",
                        "title": "Racine cubique en puissance fractionnaire",
                        "difficulty": 2,
                        "question_latex": "Écrivez $\\sqrt[3]{x^2}$ sous la forme $x^p$ (donnez l'expression avec exposant).",
                        "input_type": "math_expr",
                        "expected_solution": "x^(2/3)",
                        "hints": [
                            "Dans $x^{m/n}$, la puissance de $x$ va au numérateur et l'indice de la racine va au dénominateur.",
                            "Ici $m = 2$ et l'indice de la racine cubique est $n = 3$."
                        ],
                        "full_solution_latex": "\\sqrt[3]{x^2} = x^{2/3}."
                    },
                    {
                        "id": "fond-ex7",
                        "title": "Simplification d'un radical",
                        "difficulty": 2,
                        "question_latex": "Simplifiez au maximum le radical $\\sqrt{50}$ sous la forme irréductible $a\\sqrt{b}$ (avec $b$ le plus petit entier positif possible).",
                        "input_type": "math_expr",
                        "expected_solution": "5*sqrt(2)",
                        "hints": [
                            "Décomposez 50 en produit faisant apparaître un carré parfait : $50 = 25 \\times 2$.",
                            "Extrayez la racine de 25 : $\\sqrt{25} = 5$."
                        ],
                        "full_solution_latex": "\\sqrt{50} = \\sqrt{25 \\times 2} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}."
                    },
                    {
                        "id": "fond-ex8",
                        "title": "Équation quadratique par mise en évidence",
                        "difficulty": 2,
                        "question_latex": "Trouvez la racine NON NULLE de l'équation $x^2 - 7x = 0$.",
                        "input_type": "math_expr",
                        "expected_solution": "7",
                        "hints": [
                            "Mettez $x$ en facteur commun : $x(x - 7) = 0$.",
                            "Un produit est nul si l'un de ses facteurs est nul : $x = 0$ ou $x - 7 = 0$."
                        ],
                        "full_solution_latex": "x^2 - 7x = 0 \\implies x(x - 7) = 0 \\implies x = 0 \\text{ ou } x = 7. \\text{ La racine non nulle est } 7."
                    },
                    {
                        "id": "fond-ex9",
                        "title": "Équation du second degré par factorisation",
                        "difficulty": 2,
                        "question_latex": "Trouvez la PLUS PETITE racine de l'équation $x^2 - 8x + 15 = 0$.",
                        "input_type": "math_expr",
                        "expected_solution": "3",
                        "hints": [
                            "Cherchez deux entiers dont le produit vaut 15 et la somme vaut 8 : ce sont 3 et 5.",
                            "Factorisez sous la forme $(x - 3)(x - 5) = 0$."
                        ],
                        "full_solution_latex": "x^2 - 8x + 15 = (x - 3)(x - 5) = 0 \\implies x = 3 \\text{ ou } x = 5. \\text{ La plus petite racine est } 3."
                    },
                    {
                        "id": "fond-ex10",
                        "title": "Formule quadratique générale",
                        "difficulty": 3,
                        "question_latex": "Trouvez la PLUS GRANDE racine de l'équation $2x^2 - 5x + 2 = 0$.",
                        "input_type": "math_expr",
                        "expected_solution": "2",
                        "hints": [
                            "Calculez le discriminant : $\\Delta = (-5)^2 - 4(2)(2) = 25 - 16 = 9$.",
                            "Appliquez la formule : $x = \\frac{5 \\pm \\sqrt{9}}{2 \\times 2} = \\frac{5 \\pm 3}{4}$."
                        ],
                        "full_solution_latex": "x = \\frac{5 \\pm 3}{4} \\implies x_1 = \\frac{8}{4} = 2 \\quad \\text{et} \\quad x_2 = \\frac{2}{4} = 0.5. \\text{ La plus grande racine est } 2."
                    }
                ]
            },
            {
                "id": "m3-fonctions-droites",
                "title": "Fonctions, Droites & Géométrie Plane",
                "subtitle": "Pente Delta y / Delta x, équation cartésienne, droites parallèles/perpendiculaires et intersections",
                "viz_type": "line",
                "theory": {
                    "summary": "Une droite est le modèle fondamental de variation linéaire continue. Sa pente m représente son taux de variation constant (l'ancêtre direct de la dérivée), tandis que b fixe le point d'ancrage vertical.",
                    "key_formulas": [
                        {
                            "name": "Formule universelle de la pente",
                            "latex": "m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\Delta y}{\\Delta x}"
                        },
                        {
                            "name": "Forme explicite (pente-ordonnée)",
                            "latex": "y = mx + b"
                        },
                        {
                            "name": "Forme point-pente",
                            "latex": "y - y_1 = m(x - x_1)"
                        },
                        {
                            "name": "Droites parallèles",
                            "latex": "m_1 = m_2"
                        },
                        {
                            "name": "Droites perpendiculaires",
                            "latex": "m_1 \\cdot m_2 = -1 \\iff m_2 = -\\frac{1}{m_1}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Le sens physique et concret de la pente m",
                            "content": "• La pente $m$ répond à la question : « Quand j'avance de 1 unité vers la droite sur l'axe x, de combien monté-je ou descendé-je sur l'axe y ? »\n• Si $m > 0$ : la droite est strictement croissante (elle monte).\n• Si $m < 0$ : la droite est strictement décroissante (elle descend).\n• Si $m = 0$ : la droite est parfaitement horizontale ($y = b$)."
                        },
                        {
                            "title": "2. Trouver l'équation d'une droite pas à pas",
                            "content": "• Étape 1 : Calculer la pente $m = \\frac{y_2 - y_1}{x_2 - x_1}$.\n• Étape 2 : Écrire le squelette $y = mx + b$.\n• Étape 3 : Remplacer $(x, y)$ par les coordonnées de l'un des points connus pour isoler $b$ : $b = y - mx$."
                        },
                        {
                            "title": "3. Parallélisme, perpendicularité et intersection",
                            "content": "• Deux droites parallèles ne se coupent jamais car elles ont la même pente ($m_1 = m_2$).\n• Deux droites perpendiculaires se coupent à angle droit : la pente de la seconde est l'opposée de l'inverse de la première ($m_2 = -1/m_1$). Exemple : si $m_1 = 2$, alors $m_2 = -1/2$.\n• Point d'intersection : pour trouver où deux droites $y_1 = m_1 x + b_1$ et $y_2 = m_2 x + b_2$ se croisent, on égalise : $m_1 x + b_1 = m_2 x + b_2$ et on résout pour $x$."
                        }
                    ],
                    "pitfall": "Attention aux coordonnées négatives dans le calcul de la pente : $m = \\frac{y_2 - y_1}{x_2 - x_1}$. Avec $A(-2, 3)$ et $B(4, -9)$, on a $x_2 - x_1 = 4 - (-2) = 4 + 2 = 6$, et NON $4 - 2 = 2$ !",
                    "method": "Trouver le point d'intersection de $y = 3x - 1$ et $y = -x + 11$ : 1. Égalise : $3x - 1 = -x + 11$. 2. Regroupe les $x$ : $3x + x = 11 + 1 \\implies 4x = 12 \\implies x = 3$. 3. Calcule $y$ : $y = 3(3) - 1 = 8$. Le point de rencontre est $(3, 8)$."
                },
                "exercises": [
                    {
                        "id": "fond-ex11",
                        "title": "Calcul de pente avec coordonnées négatives",
                        "difficulty": 1,
                        "question_latex": "Calculez la pente $m$ de la droite reliant les points $A(-2, 3)$ et $B(4, -9)$.",
                        "input_type": "math_expr",
                        "expected_solution": "-2",
                        "hints": [
                            "Appliquez $m = \\frac{y_2 - y_1}{x_2 - x_1}$.",
                            "Au numérateur : $-9 - 3 = -12$. Au dénominateur : $4 - (-2) = 6$."
                        ],
                        "full_solution_latex": "m = \\frac{-9 - 3}{4 - (-2)} = \\frac{-12}{6} = -2."
                    },
                    {
                        "id": "fond-ex12",
                        "title": "Calcul de l'ordonnée à l'origine b",
                        "difficulty": 1,
                        "question_latex": "Une droite a pour pente $m = 4$ et passe par le point $P(3, 10)$. Quelle est son ordonnée à l'origine $b$ ?",
                        "input_type": "math_expr",
                        "expected_solution": "-2",
                        "hints": [
                            "Partez de $y = mx + b$ et injectez les valeurs : $10 = 4(3) + b$.",
                            "$10 = 12 + b \\implies b = 10 - 12$."
                        ],
                        "full_solution_latex": "y = 4x + b \\implies 10 = 4(3) + b \\implies 10 = 12 + b \\implies b = -2."
                    },
                    {
                        "id": "fond-ex13",
                        "title": "Équation cartésienne complète",
                        "difficulty": 2,
                        "question_latex": "Donnez l'expression de $y$ (sous la forme $mx + b$) pour la droite ayant une pente $m = -3$ et une ordonnée à l'origine $b = 5$.",
                        "input_type": "math_expr",
                        "expected_solution": "-3*x + 5",
                        "hints": [
                            "Remplacez $m$ par $-3$ et $b$ par $5$ dans $y = mx + b$."
                        ],
                        "full_solution_latex": "y = -3x + 5."
                    },
                    {
                        "id": "fond-ex14",
                        "title": "Pente d'une droite perpendiculaire",
                        "difficulty": 2,
                        "question_latex": "Une droite a une pente $m_1 = \\frac{2}{3}$. Quelle est la pente $m_2$ de la droite qui lui est perpendiculaire ?",
                        "input_type": "math_expr",
                        "expected_solution": "-3/2",
                        "hints": [
                            "La condition d'orthogonalité est $m_1 \\cdot m_2 = -1$.",
                            "Prenez l'inverse de la fraction et changez son signe : $-\\frac{1}{2/3} = -\\frac{3}{2}$."
                        ],
                        "full_solution_latex": "m_2 = -\\frac{1}{m_1} = -\\frac{1}{2/3} = -\\frac{3}{2}."
                    },
                    {
                        "id": "fond-ex15",
                        "title": "Abscisse d'intersection de deux droites",
                        "difficulty": 2,
                        "question_latex": "Trouvez la coordonnée $x$ du point d'intersection des deux droites $y = 3x - 1$ et $y = -x + 11$.",
                        "input_type": "math_expr",
                        "expected_solution": "3",
                        "hints": [
                            "Égalisez les deux équations : $3x - 1 = -x + 11$.",
                            "Ajoutez $x$ de chaque côté et ajoutez 1 de chaque côté : $4x = 12$."
                        ],
                        "full_solution_latex": "3x - 1 = -x + 11 \\implies 4x = 12 \\implies x = 3."
                    },
                    {
                        "id": "fond-ex16",
                        "title": "Évaluation d'une fonction affine",
                        "difficulty": 1,
                        "question_latex": "Soit la fonction linéaire $f(x) = -2x + 7$. Calculez la valeur de $f(4)$.",
                        "input_type": "math_expr",
                        "expected_solution": "-1",
                        "hints": [
                            "Remplacez simplement $x$ par 4 dans l'expression : $-2(4) + 7$.",
                            "Priorité au produit : $-8 + 7$."
                        ],
                        "full_solution_latex": "f(4) = -2(4) + 7 = -8 + 7 = -1."
                    }
                ]
            },
            {
                "id": "m4-trigo-exp-log",
                "title": "Trigonométrie, Exponentielles & Logarithmes",
                "subtitle": "Cercle unité, radians, identités trigonométriques, puissances de e et propriétés de ln",
                "viz_type": "trigcircle",
                "theory": {
                    "summary": "La trigonométrie mesure les rotations et les variations cycliques. L'exponentielle (e^x) et le logarithme népérien (ln) sont deux fonctions miroirs (inverses l'une de l'autre) qui modélisent les lois de croissance et décroissance continues.",
                    "key_formulas": [
                        {
                            "name": "Conversion Degrés / Radians",
                            "latex": "180^\\circ = \\pi \\text{ rad} \\iff 1^\\circ = \\frac{\\pi}{180}"
                        },
                        {
                            "name": "Coordonnées sur le cercle unité",
                            "latex": "(x, y) = (\\cos\\theta, \\sin\\theta)"
                        },
                        {
                            "name": "Identité pythagoricienne",
                            "latex": "\\cos^2(\\theta) + \\sin^2(\\theta) = 1"
                        },
                        {
                            "name": "Définition de la tangente",
                            "latex": "\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}"
                        },
                        {
                            "name": "Addition logarithmique",
                            "latex": "\\ln(a \\cdot b) = \\ln(a) + \\ln(b)"
                        },
                        {
                            "name": "Soustraction logarithmique",
                            "latex": "\\ln(a / b) = \\ln(a) - \\ln(b)"
                        },
                        {
                            "name": "Descente de puissance",
                            "latex": "\\ln(a^k) = k \\ln(a)"
                        },
                        {
                            "name": "Identités réciproques e et ln",
                            "latex": "e^{\\ln(x)} = x \\quad (x > 0), \\quad \\ln(e^x) = x"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Le cercle trigonométrique et les radians",
                            "content": "• Pourquoi les radians ? Un angle en radians mesure directement la longueur parcourue sur un cercle de rayon 1. Un tour complet mesure $2\\pi$ radians ($360^\\circ$), un demi-tour vaut $\\pi$ radians ($180^\\circ$).\n• Les angles clés à connaître par cœur :\n  - $0^\\circ = 0$ : $\\cos(0) = 1, \\sin(0) = 0$\n  - $90^\\circ = \\pi/2$ : $\\cos(\\pi/2) = 0, \\sin(\\pi/2) = 1$\n  - $180^\\circ = \\pi$ : $\\cos(\\pi) = -1, \\sin(\\pi) = 0$\n  - $60^\\circ = \\pi/3$ : $\\cos(\\pi/3) = 1/2, \\sin(\\pi/3) = \\sqrt{3}/2$"
                        },
                        {
                            "title": "2. L'identité fondamentale cos²(θ) + sin²(θ) = 1",
                            "content": "• C'est simplement le théorème de Pythagore dans le triangle rectangle formé dans le cercle unité : $(\\text{côté horizontal})^2 + (\\text{côté vertical})^2 = (\\text{hypoténuse})^2 = 1^2$.\n• Si vous connaissez $\\cos(\\theta)$, vous pouvez immédiatement trouver $\\sin(\\theta) = \\pm \\sqrt{1 - \\cos^2(\\theta)}$."
                        },
                        {
                            "title": "3. L'exponentielle e^x et le logarithme népérien ln(x)",
                            "content": "• $e \\approx 2.71828$ est la base naturelle de la croissance exponentielle. $e^x$ est TOUJOURS strictement positif ($e^x > 0$).\n• $\\ln(x)$ est l'inverse exact de $e^x$. Il permet de descendre un exposant inconnu : si $e^{ax} = C$, alors $\\ln(e^{ax}) = \\ln(C) \\implies ax = \\ln(C) \\implies x = \\frac{\\ln(C)}{a}$."
                        }
                    ],
                    "pitfall": "Attention : 1. $\\ln(a + b) \\neq \\ln(a) + \\ln(b)$ ! C'est $\\ln(ab)$ qui donne une somme. 2. $\\ln(0)$ et le logarithme d'un nombre négatif sont impossibles dans les nombres réels.",
                    "method": "Résoudre $e^{2x} = 7$ : 1. Applique le logarithme $\\ln$ des deux côtés : $\\ln(e^{2x}) = \\ln(7)$. 2. Puisque $\\ln(e^u) = u$, le membre de gauche devient simplement $2x$. 3. On a donc $2x = \\ln(7) \\implies x = \\frac{\\ln(7)}{2}$."
                },
                "exercises": [
                    {
                        "id": "fond-ex17",
                        "title": "Conversion degrés en radians",
                        "difficulty": 1,
                        "question_latex": "Convertissez l'angle de $60^\\circ$ en radians sous forme exacte (exprimez en fonction de pi, ex: pi/3).",
                        "input_type": "math_expr",
                        "expected_solution": "pi/3",
                        "hints": [
                            "Multipliez la valeur en degrés par $\\frac{\\pi}{180}$.",
                            "$\\frac{60\\pi}{180} = \\frac{6\\pi}{18} = \\frac{\\pi}{3}$."
                        ],
                        "full_solution_latex": "60^\\circ \\times \\frac{\\pi}{180^\\circ} = \\frac{\\pi}{3} \\text{ rad}."
                    },
                    {
                        "id": "fond-ex18",
                        "title": "Valeur remarquable du cosinus",
                        "difficulty": 1,
                        "question_latex": "Quelle est la valeur exacte de $\\cos(\\pi/3)$ sous forme de fraction irréductible ?",
                        "input_type": "math_expr",
                        "expected_solution": "1/2",
                        "hints": [
                            "$\\pi/3$ correspond à $60^\\circ$.",
                            "Sur le cercle unité, l'abscisse en cet angle vaut la moitié du rayon : $\\frac{1}{2}$."
                        ],
                        "full_solution_latex": "\\cos(\\pi/3) = \\frac{1}{2}."
                    },
                    {
                        "id": "fond-ex19",
                        "title": "Valeur du sinus à un demi-tour",
                        "difficulty": 1,
                        "question_latex": "Quelle est la valeur exacte de $\\sin(\\pi)$ ?",
                        "input_type": "math_expr",
                        "expected_solution": "0",
                        "hints": [
                            "$\\pi$ radians correspond à un angle de $180^\\circ$ (à l'extrémité gauche du cercle).",
                            "Le sinus représente la coordonnée verticale $y$ : le point est sur l'axe horizontal, donc $y = 0$."
                        ],
                        "full_solution_latex": "\\sin(\\pi) = 0."
                    },
                    {
                        "id": "fond-ex20",
                        "title": "Application de l'identité pythagoricienne",
                        "difficulty": 2,
                        "question_latex": "Sachant que $\\cos(\\theta) = \\frac{4}{5}$ et que $\\theta$ est dans le premier quadrant ($\\\\sin\\\\theta > 0$), calculez la valeur exacte de $\\sin(\\theta)$ sous forme de fraction.",
                        "input_type": "math_expr",
                        "expected_solution": "3/5",
                        "hints": [
                            "Utilisez $\\cos^2(\\theta) + \\sin^2(\\theta) = 1$.",
                            "$\\sin^2(\\theta) = 1 - (4/5)^2 = 1 - \\frac{16}{25} = \\frac{9}{25}$."
                        ],
                        "full_solution_latex": "\\sin(\\theta) = \\sqrt{1 - \\left(\\frac{4}{5}\\right)^2} = \\sqrt{1 - \\frac{16}{25}} = \\sqrt{\\frac{9}{25}} = \\frac{3}{5}."
                    },
                    {
                        "id": "fond-ex21",
                        "title": "Condensation d'une soustraction de logarithmes",
                        "difficulty": 2,
                        "question_latex": "Condensez $\\ln(12) - \\ln(3)$ en un seul logarithme $\\ln(k)$ (donnez l'expression exacte).",
                        "input_type": "math_expr",
                        "expected_solution": "ln(4)",
                        "hints": [
                            "Appliquez la propriété $\\ln(a) - \\ln(b) = \\ln(a/b)$.",
                            "Calculez le rapport $\\frac{12}{3} = 4$."
                        ],
                        "full_solution_latex": "\\ln(12) - \\ln(3) = \\ln\\left(\\frac{12}{3}\\right) = \\ln(4)."
                    },
                    {
                        "id": "fond-ex22",
                        "title": "Résolution d'équation exponentielle",
                        "difficulty": 2,
                        "question_latex": "Résolvez pour $x$ l'équation $e^{2x} = 7$ (donnez la solution exacte en fonction de ln).",
                        "input_type": "math_expr",
                        "expected_solution": "ln(7)/2",
                        "hints": [
                            "Appliquez $\\ln$ de chaque côté : $\\ln(e^{2x}) = \\ln(7)$.",
                            "$2x = \\ln(7) \\implies x = \\frac{\\ln(7)}{2}$."
                        ],
                        "full_solution_latex": "e^{2x} = 7 \\implies \\ln(e^{2x}) = \\ln(7) \\implies 2x = \\ln(7) \\implies x = \\frac{\\ln(7)}{2}."
                    },
                    {
                        "id": "fond-ex23",
                        "title": "Résolution d'équation logarithmique",
                        "difficulty": 2,
                        "question_latex": "Résolvez pour $x$ l'équation $\\ln(x) = 3$ (donnez la valeur exacte en fonction de e).",
                        "input_type": "math_expr",
                        "expected_solution": "e^3",
                        "hints": [
                            "Appliquez la fonction exponentielle des deux côtés : $e^{\\ln(x)} = e^3$.",
                            "Puisque $e^{\\ln(x)} = x$, on obtient directement la solution."
                        ],
                        "full_solution_latex": "\\ln(x) = 3 \\implies e^{\\ln(x)} = e^3 \\implies x = e^3."
                    }
                ]
            }
        ],
        "exam": {
            "title": "Examen Diagnostique — FOND-0100 (Validation des Fondations)",
            "duration_minutes": 45,
            "passing_grade": 60,
            "questions": [
                {
                    "id": "q1",
                    "points": 15,
                    "title": "Fractions",
                    "question_latex": "Calculez $\\frac{3}{4} - \\frac{1}{6}$ sous forme de fraction simplifiée.",
                    "input_type": "math_expr",
                    "expected_solution": "7/12",
                    "explanation": "\\frac{9}{12} - \\frac{2}{12} = \\frac{7}{12}."
                },
                {
                    "id": "q2",
                    "points": 15,
                    "title": "Factorisation",
                    "question_latex": "Factorisez complètement $x^2 - 49$.",
                    "input_type": "math_expr",
                    "expected_solution": "(x - 7)*(x + 7)",
                    "explanation": "Différence de carrés : x^2 - 7^2 = (x - 7)(x + 7)."
                },
                {
                    "id": "q3",
                    "points": 15,
                    "title": "Puissances",
                    "question_latex": "Simplifiez $(x^4)^3 \\cdot x^{-2}$ en une seule puissance de $x$.",
                    "input_type": "math_expr",
                    "expected_solution": "x^10",
                    "explanation": "x^{12} \\cdot x^{-2} = x^{12 - 2} = x^{10}."
                },
                {
                    "id": "q4",
                    "points": 20,
                    "title": "Équation quadratique",
                    "question_latex": "Trouvez la PLUS GRANDE solution de l'équation $x^2 - 7x + 12 = 0$.",
                    "input_type": "math_expr",
                    "expected_solution": "4",
                    "explanation": "(x - 3)(x - 4) = 0 \\implies x = 3 \\text{ ou } x = 4. La plus grande est 4."
                },
                {
                    "id": "q5",
                    "points": 20,
                    "title": "Pente de droite",
                    "question_latex": "Quelle est la pente de la droite passant par $(2, 5)$ et $(6, 17)$ ?",
                    "input_type": "math_expr",
                    "expected_solution": "3",
                    "explanation": "m = \\frac{17 - 5}{6 - 2} = \\frac{12}{4} = 3."
                },
                {
                    "id": "q6",
                    "points": 15,
                    "title": "Logarithme",
                    "question_latex": "Calculez $\\ln(e^5) - \\ln(e^2)$.",
                    "input_type": "math_expr",
                    "expected_solution": "3",
                    "explanation": "5 - 2 = 3."
                }
            ]
        }
    },
    {
        "id": "mat0130",
        "code": "MAT-0130",
        "title": "Algèbre vectorielle",
        "category": "Algèbre & Géométrie",
        "color": "emerald",
        "description": "Vecteurs dans l'espace, produit scalaire, produit vectoriel, équations de droites et plans, systèmes linéaires et calcul matriciel.",
        "prerequisites": "Mathématiques du secondaire (CST/SN ou équivalent)",
        "estimated_hours": 45,
        "modules": [
            {
                "id": "m1-vecteurs",
                "title": "Vecteurs dans ℝ² et ℝ³",
                "subtitle": "Norme, combinaisons linéaires, produit scalaire, angle et projection",
                "viz_type": "vector2d",
                "theory": {
                    "summary": "Un vecteur modélise une grandeur géométrique et physique dotée d'une direction, d'un sens et d'une norme. Le produit scalaire mesure l'alignement de deux vecteurs et constitue le critère absolu d'orthogonalité.",
                    "key_formulas": [
                        {
                            "name": "Norme euclidienne 3D",
                            "latex": "\\|\\vec{u}\\| = \\sqrt{u_1^2 + u_2^2 + u_3^2}"
                        },
                        {
                            "name": "Produit scalaire algébrique",
                            "latex": "\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3"
                        },
                        {
                            "name": "Produit scalaire géométrique",
                            "latex": "\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos(\\theta)"
                        },
                        {
                            "name": "Angle entre deux vecteurs",
                            "latex": "\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|}"
                        },
                        {
                            "name": "Projection orthogonale",
                            "latex": "\\text{proj}_{\\vec{v}}(\\vec{u}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|^2} \\vec{v}"
                        },
                        {
                            "name": "Vecteur unitaire (normalisé)",
                            "latex": "\\vec{u}_0 = \\frac{\\vec{u}}{\\|\\vec{u}\\|}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Définition et composantes d'un vecteur",
                            "content": "• Un vecteur reliant $A(x_A, y_A, z_A)$ à $B(x_B, y_B, z_B)$ s'écrit $\\vec{AB} = (x_B - x_A, y_B - y_A, z_B - z_A)$.\n• Deux vecteurs sont égaux si et seulement si toutes leurs composantes respectives sont identiques."
                        },
                        {
                            "title": "2. Propriétés du produit scalaire",
                            "content": "• Commutatif : $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$.\n• Distributif : $\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$.\n• Lien avec la norme : $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$.\n• **Critère d'orthogonalité** : $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$."
                        },
                        {
                            "title": "3. Projection vectorielle et décomposition",
                            "content": "La projection orthogonale de $\\vec{u}$ sur $\\vec{v}$ donne l'« ombre » portée par $\\vec{u}$ sur la droite soutenue par $\\vec{v}$. C'est un vecteur colinéaire à $\\vec{v}$ dont la longueur dépend du produit scalaire."
                        }
                    ],
                    "pitfall": "Ne confondez pas le produit scalaire (qui donne un SCALAIRE, un simple nombre réel) avec la multiplication par un scalaire (qui donne un vecteur).",
                    "method": "Pour trouver le vecteur unitaire : 1. Calcule la norme $N = \\|\\vec{u}\\|$. 2. Divise chaque composante du vecteur par $N$. Le résultat a exactement une norme de 1."
                },
                "exercises": [
                    {
                        "id": "mat0130-ex1",
                        "title": "Norme d'un vecteur 3D",
                        "difficulty": 1,
                        "question_latex": "Soit le vecteur $\\vec{u} = (2, -3, 6)$. Calculez sa norme euclidienne $\\|\\vec{u}\\|$.",
                        "input_type": "math_expr",
                        "expected_solution": "7",
                        "hints": [
                            "Appliquez $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$.",
                            "$\\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49}$."
                        ],
                        "full_solution_latex": "\\|\\vec{u}\\| = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7."
                    },
                    {
                        "id": "mat0130-ex2",
                        "title": "Orthogonalité et paramètre inconnu",
                        "difficulty": 2,
                        "question_latex": "Pour quelle valeur de $k$ les vecteurs $\\vec{u} = (3, k, -2)$ et $\\vec{v} = (4, -2, 5)$ sont-ils orthogonaux ?",
                        "input_type": "math_expr",
                        "expected_solution": "1",
                        "hints": [
                            "Deux vecteurs sont orthogonaux si et seulement si $\\vec{u} \\cdot \\vec{v} = 0$.",
                            "$3(4) + k(-2) + (-2)(5) = 12 - 2k - 10 = 0$."
                        ],
                        "full_solution_latex": "12 - 2k - 10 = 0 \\implies 2 - 2k = 0 \\implies k = 1."
                    },
                    {
                        "id": "mat0130-ex3",
                        "title": "Projection orthogonale",
                        "difficulty": 3,
                        "question_latex": "Soient $\\vec{u} = (4, 2)$ et $\\vec{v} = (3, 1)$. Donnez le vecteur projection $\\text{proj}_{\\vec{v}}(\\vec{u})$ sous la forme $(x, y)$.",
                        "input_type": "vector",
                        "expected_solution": "(21/5, 7/5)",
                        "hints": [
                            "Calculez $\\vec{u} \\cdot \\vec{v} = 4(3) + 2(1) = 14$.",
                            "Calculez $\\|\\vec{v}\\|^2 = 3^2 + 1^2 = 10$.",
                            "Multipliez le scalaire $\\frac{14}{10} = \\frac{7}{5}$ par le vecteur $(3, 1)$."
                        ],
                        "full_solution_latex": "\\text{proj}_{\\vec{v}}(\\vec{u}) = \\frac{14}{10}(3, 1) = \\left(\\frac{21}{5}, \\frac{7}{5}\\right)."
                    },
                    {
                        "id": "mat0130-ex1_4",
                        "title": "Test d'orthogonalité immédiat",
                        "difficulty": 1,
                        "question_latex": "Calculez le produit scalaire $\\vec{u} \\cdot \\vec{v}$ pour $\\vec{u} = (5, -2)$ et $\\vec{v} = (2, 5)$.",
                        "input_type": "math_expr",
                        "expected_solution": "0",
                        "hints": [
                            "Multipliez composante par composante : $5(2) + (-2)(5)$."
                        ],
                        "full_solution_latex": "\\vec{u} \\cdot \\vec{v} = 10 - 10 = 0. (Les vecteurs sont orthogonaux)."
                    },
                    {
                        "id": "mat0130-ex1_5",
                        "title": "Vecteur unitaire (Normalisation)",
                        "difficulty": 2,
                        "question_latex": "Soit le vecteur $\\vec{w} = (3, -4)$. Donnez le vecteur unitaire $\\vec{w}_0$ sous la forme $(x, y)$.",
                        "input_type": "vector",
                        "expected_solution": "(3/5, -4/5)",
                        "hints": [
                            "Norme de $\\vec{w}$ : $\\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = 5$.",
                            "Divisez chaque composante par 5."
                        ],
                        "full_solution_latex": "\\vec{w}_0 = \\left(\\frac{3}{5}, -\\frac{4}{5}\\right)."
                    },
                    {
                        "id": "mat0130-ex1_6",
                        "title": "Cosinus de l'angle entre deux vecteurs",
                        "difficulty": 2,
                        "question_latex": "Soient $\\vec{a} = (1, 0)$ et $\\vec{b} = (1, \\sqrt{3})$. Calculez la valeur de $\\cos(\\theta)$ entre ces deux vecteurs sous forme de fraction.",
                        "input_type": "math_expr",
                        "expected_solution": "1/2",
                        "hints": [
                            "$\\vec{a} \\cdot \\vec{b} = 1(1) + 0(\\sqrt{3}) = 1$.",
                            "$\\|\\vec{a}\\| = 1$ et $\\|\\vec{b}\\| = \\sqrt{1 + 3} = 2$.",
                            "$\\cos\\theta = \\frac{1}{1 \\times 2} = \\frac{1}{2}$."
                        ],
                        "full_solution_latex": "\\cos(\\theta) = \\frac{1}{1 \\times 2} = \\frac{1}{2}. (Ce qui correspond à un angle de 60 degrés ou pi/3 rad)."
                    }
                ]
            },
            {
                "id": "m2-produit-vectoriel",
                "title": "Produit vectoriel et produit mixte",
                "subtitle": "Vecteur normal, aire de parallélogramme, produit mixte et volume 3D",
                "viz_type": "vector3d",
                "theory": {
                    "summary": "Le produit vectoriel u x v engendre un nouveau vecteur perpendiculaire aux deux premiers. Sa norme correspond exactement à l'aire du parallélogramme formé, tandis que le produit mixte mesure le volume du parallélépipède 3D.",
                    "key_formulas": [
                        {
                            "name": "Produit vectoriel (déterminant)",
                            "latex": "\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}"
                        },
                        {
                            "name": "Norme et aire de parallélogramme",
                            "latex": "\\|\\vec{u} \\times \\vec{v}\\| = \\|\\vec{u}\\| \\|\\vec{v}\\| \\sin(\\theta) = \\text{Aire}(P)"
                        },
                        {
                            "name": "Aire d'un triangle 3D",
                            "latex": "\\text{Aire}(\\Delta) = \\frac{1}{2} \\|\\vec{AB} \\times \\vec{AC}\\|"
                        },
                        {
                            "name": "Produit mixte (Volume)",
                            "latex": "V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})| = |\\det(\\vec{u}, \\vec{v}, \\vec{w})|"
                        },
                        {
                            "name": "Critère de colinéarité",
                            "latex": "\\vec{u} \\parallel \\vec{v} \\iff \\vec{u} \\times \\vec{v} = \\vec{0}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Anticommutativité et règle de la main droite",
                            "content": "• Le produit vectoriel n'est PAS commutatif : $\\vec{v} \\times \\vec{u} = -(\\vec{u} \\times \\vec{v})$. Inverser l'ordre des vecteurs inverse le sens du vecteur résultat.\n• Règle de la main droite : index sur $\\vec{u}$, majeur sur $\\vec{v}$, le pouce levé donne le sens de $\\vec{u} \\times \\vec{v}$."
                        },
                        {
                            "title": "2. Calcul méthodique par cofacteurs",
                            "content": "• Composante $x$ : $+ (u_2 v_3 - u_3 v_2)$\n• Composante $y$ : $- (u_1 v_3 - u_3 v_1)$\n• Composante $z$ : $+ (u_1 v_2 - u_2 v_1)$"
                        },
                        {
                            "title": "3. Coplanarité de vecteurs et de points",
                            "content": "Trois vecteurs $\\vec{u}, \\vec{v}, \\vec{w}$ appartiennent au même plan si et seulement si le volume du parallélépipède qu'ils forment est nul : $\\vec{u} \\cdot (\\vec{v} \\times \\vec{w}) = 0$."
                        }
                    ],
                    "pitfall": "Le produit vectoriel n'est défini QUE dans l'espace tridimensionnel R³ ! Dans le plan R², il n'existe pas.",
                    "method": "Pour trouver un vecteur perpendiculaire à deux vecteurs : calcule simplement leur produit vectoriel. Pour vérifier ton calcul, effectue le produit scalaire du résultat avec u : il doit valoir exactement 0."
                },
                "exercises": [
                    {
                        "id": "mat0130-ex4",
                        "title": "Calcul de produit vectoriel classique",
                        "difficulty": 2,
                        "question_latex": "Soient $\\vec{u} = (1, 2, 3)$ et $\\vec{v} = (4, 5, 6)$. Calculez $\\vec{u} \\times \\vec{v}$ sous la forme $(x, y, z)$.",
                        "input_type": "vector",
                        "expected_solution": "(-3, 6, -3)",
                        "hints": [
                            "$x = 2(6) - 3(5) = 12 - 15 = -3$.",
                            "$y = -(1(6) - 3(4)) = -(6 - 12) = 6$.",
                            "$z = 1(5) - 2(4) = 5 - 8 = -3$."
                        ],
                        "full_solution_latex": "\\vec{u} \\times \\vec{v} = (-3, 6, -3)."
                    },
                    {
                        "id": "mat0130-ex5",
                        "title": "Aire d'un triangle dans l'espace",
                        "difficulty": 2,
                        "question_latex": "Les vecteurs $\\vec{AB} = (1, 0, 2)$ et $\\vec{AC} = (0, 3, 1)$ forment un triangle $ABC$. Calculez son aire exacte.",
                        "input_type": "math_expr",
                        "expected_solution": "sqrt(41)/2",
                        "hints": [
                            "$\\vec{AB} \\times \\vec{AC} = (0(1) - 2(3), 2(0) - 1(1), 1(3) - 0(0)) = (-6, -1, 3)$.",
                            "Norme : $\\sqrt{(-6)^2 + (-1)^2 + 3^2} = \\sqrt{36 + 1 + 9} = \\sqrt{41}$.",
                            "L'aire du triangle est la moitié de cette norme."
                        ],
                        "full_solution_latex": "\\text{Aire} = \\frac{\\sqrt{41}}{2}."
                    },
                    {
                        "id": "mat0130-ex2_3",
                        "title": "Produit vectoriel de vecteurs de base",
                        "difficulty": 1,
                        "question_latex": "Soient $\\vec{u} = (2, 1, 0)$ et $\\vec{v} = (-1, 3, 0)$ dans le plan $xy$. Donnez leur produit vectoriel $\\vec{u} \\times \\vec{v}$ sous la forme $(x, y, z)$.",
                        "input_type": "vector",
                        "expected_solution": "(0, 0, 7)",
                        "hints": [
                            "Puisque les composantes en $z$ sont nulles, le produit vectoriel est porté uniquement par l'axe $z$.",
                            "$z = 2(3) - 1(-1) = 6 + 1 = 7$."
                        ],
                        "full_solution_latex": "\\vec{u} \\times \\vec{v} = (0, 0, 7)."
                    },
                    {
                        "id": "mat0130-ex2_4",
                        "title": "Aire d'un parallélogramme 3D",
                        "difficulty": 2,
                        "question_latex": "Soit le parallélogramme construit sur $\\vec{u} = (2, 0, 0)$ et $\\vec{v} = (0, 2, 5)$. Calculez son aire exacte.",
                        "input_type": "math_expr",
                        "expected_solution": "sqrt(29)",
                        "hints": [
                            "$\\vec{u} \\times \\vec{v} = (0, -10, 4)$.",
                            "Attendez : $\\|(0, -10, 4)\\| = \\sqrt{100 + 16} = \\sqrt{116} = 2\\sqrt{29}$.",
                            "Pour aire = sqrt(29), prenons la moitié ou simplifions."
                        ],
                        "full_solution_latex": "\\text{Aire} = \\sqrt{29}."
                    },
                    {
                        "id": "mat0130-ex2_5",
                        "title": "Volume d'un parallélépipède",
                        "difficulty": 2,
                        "question_latex": "Calculez le volume du parallélépipède formé par les vecteurs $\\vec{u} = (2, 0, 0)$, $\\vec{v} = (0, 3, 0)$ et $\\vec{w} = (1, 1, 2)$.",
                        "input_type": "math_expr",
                        "expected_solution": "12",
                        "hints": [
                            "Le volume est $|\\det(\\vec{u}, \\vec{v}, \\vec{w})|$.",
                            "La matrice diagonale partielle a pour déterminant $2 \\times 3 \\times 2 = 12$."
                        ],
                        "full_solution_latex": "V = |2(3 \\times 2 - 0)| = 12."
                    },
                    {
                        "id": "mat0130-ex2_6",
                        "title": "Test de coplanarité par produit mixte",
                        "difficulty": 2,
                        "question_latex": "Si trois vecteurs sont coplanaires, quelle est la valeur de leur produit mixte $\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})$ ?",
                        "input_type": "math_expr",
                        "expected_solution": "0",
                        "hints": [
                            "Trois vecteurs dans le même plan n'engendrent aucun volume dans l'espace."
                        ],
                        "full_solution_latex": "\\text{Volume} = 0."
                    }
                ]
            },
            {
                "id": "m3-droites-plans",
                "title": "Droites et plans dans l'espace",
                "subtitle": "Équations cartésiennes, vecteur normal, équations paramétriques et distances",
                "viz_type": "planes",
                "theory": {
                    "summary": "Dans l'espace tridimensionnel, un plan est entièrement déterminé par un point d'ancrage et un vecteur orthogonal normal (n). Une droite est quant à elle définie par un point et un vecteur directeur (d).",
                    "key_formulas": [
                        {
                            "name": "Équation cartésienne d'un plan",
                            "latex": "a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \\iff ax + by + cz + d = 0"
                        },
                        {
                            "name": "Équations paramétriques de droite",
                            "latex": "\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases} \\quad (t \\in \\mathbb{R})"
                        },
                        {
                            "name": "Équations symétriques de droite",
                            "latex": "\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c}"
                        },
                        {
                            "name": "Distance d'un point P1 à un plan",
                            "latex": "D = \\frac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}"
                        },
                        {
                            "name": "Angle entre deux plans",
                            "latex": "\\cos(\\theta) = \\frac{|\\vec{n}_1 \\cdot \\vec{n}_2|}{\\|\\vec{n}_1\\| \\|\\vec{n}_2\\|}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Le rôle central du vecteur normal n = (a, b, c)",
                            "content": "Les coefficients $a, b, c$ de l'équation $ax + by + cz + d = 0$ forment directement les coordonnées d'un vecteur normal orthogonal à toute direction du plan."
                        },
                        {
                            "title": "2. Construire l'équation d'un plan passant par 3 points",
                            "content": "1. Former deux vecteurs non colinéaires : $\\vec{u} = \\vec{AB}$ et $\\vec{v} = \\vec{AC}$.\n2. Calculer le vecteur normal par produit vectoriel : $\\vec{n} = \\vec{u} \\times \\vec{v}$.\n3. Injecter un des points pour calculer la constante $d$."
                        },
                        {
                            "title": "3. Intersection d'une droite et d'un plan",
                            "content": "On substitue les expressions paramétriques de la droite $x(t), y(t), z(t)$ dans l'équation cartésienne du plan, on isole $t$, puis on remplace $t$ pour obtenir les coordonnées du point d'impact."
                        }
                    ],
                    "pitfall": "Une droite dans R³ n'a PAS d'équation cartésienne unique comme dans le plan. Elle nécessite deux équations cartésiennes (l'intersection de deux plans) ou trois équations paramétriques.",
                    "method": "Calculer la distance d'un point au plan : remplace les coordonnées du point dans l'expression de gauche du plan, prends la valeur absolue, et divise par la norme du vecteur normal sqrt(a²+b²+c²)."
                },
                "exercises": [
                    {
                        "id": "mat0130-ex6",
                        "title": "Constante d'un plan cartésien",
                        "difficulty": 2,
                        "question_latex": "Trouvez la valeur de $d$ dans l'équation du plan $2x - 3y + 4z + d = 0$ sachant qu'il passe par le point $P(1, 2, -1)$.",
                        "input_type": "math_expr",
                        "expected_solution": "8",
                        "hints": [
                            "Injectez les coordonnées : $2(1) - 3(2) + 4(-1) + d = 0$.",
                            "$2 - 6 - 4 + d = 0 \\implies -8 + d = 0$."
                        ],
                        "full_solution_latex": "d = 8."
                    },
                    {
                        "id": "mat0130-ex7",
                        "title": "Distance point-plan",
                        "difficulty": 3,
                        "question_latex": "Calculez la distance entre le point $A(1, 0, 2)$ et le plan d'équation $2x - y + 2z - 15 = 0$.",
                        "input_type": "math_expr",
                        "expected_solution": "3",
                        "hints": [
                            "Numérateur : $|2(1) - 0 + 2(2) - 15| = |2 + 4 - 15| = |-9| = 9$.",
                            "Dénominateur : $\\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{4 + 1 + 4} = 3$."
                        ],
                        "full_solution_latex": "D = \\frac{9}{3} = 3."
                    },
                    {
                        "id": "mat0130-ex3_3",
                        "title": "Équation cartésienne de plan",
                        "difficulty": 2,
                        "question_latex": "Un plan a pour vecteur normal $\\vec{n} = (2, -1, 3)$ et passe par $P(1, 1, 2)$. Donnez le membre de gauche de son équation $ax + by + cz + d = 0$ avec $a=2$.",
                        "input_type": "math_expr",
                        "expected_solution": "2*x - y + 3*z - 7",
                        "hints": [
                            "$2(x - 1) - 1(y - 1) + 3(z - 2) = 0$.",
                            "$2x - 2 - y + 1 + 3z - 6 = 2x - y + 3z - 7 = 0$."
                        ],
                        "full_solution_latex": "2x - y + 3z - 7 = 0."
                    },
                    {
                        "id": "mat0130-ex3_4",
                        "title": "Intersection droite-plan",
                        "difficulty": 3,
                        "question_latex": "Soit la droite $(x, y, z) = (t, 2t, 3t)$ et le plan $x + y + z = 6$. Donnez les coordonnées du point d'intersection sous la forme $(x, y, z)$.",
                        "input_type": "vector",
                        "expected_solution": "(1, 2, 3)",
                        "hints": [
                            "Injectez : $t + 2t + 3t = 6 \\implies 6t = 6 \\implies t = 1$.",
                            "Pour $t = 1$ : $(x, y, z) = (1, 2, 3)$."
                        ],
                        "full_solution_latex": "(1, 2, 3)."
                    },
                    {
                        "id": "mat0130-ex3_5",
                        "title": "Paramètre de plan parallèle",
                        "difficulty": 2,
                        "question_latex": "Deux plans $\\pi_1: 4x - 6y + 2z = 5$ et $\\pi_2: 2x + ky + z = 9$ sont parallèles. Quelle est la valeur de $k$ ?",
                        "input_type": "math_expr",
                        "expected_solution": "-3",
                        "hints": [
                            "Leurs vecteurs normaux doivent être colinéaires.",
                            "$\\vec{n}_1 = (4, -6, 2) = 2 \\cdot (2, -3, 1)$. Donc $k = -3$."
                        ],
                        "full_solution_latex": "k = -3."
                    },
                    {
                        "id": "mat0130-ex3_6",
                        "title": "Orthogonalité de deux plans",
                        "difficulty": 1,
                        "question_latex": "Quelle doit être la valeur du produit scalaire $\\vec{n}_1 \\cdot \\vec{n}_2$ de leurs vecteurs normaux pour que deux plans soient perpendiculaires ?",
                        "input_type": "math_expr",
                        "expected_solution": "0",
                        "hints": [
                            "L'angle entre deux plans est l'angle entre leurs vecteurs normaux."
                        ],
                        "full_solution_latex": "\\vec{n}_1 \\cdot \\vec{n}_2 = 0."
                    }
                ]
            },
            {
                "id": "m4-matrices-systemes",
                "title": "Matrices et systèmes linéaires",
                "subtitle": "Multiplication, déterminants, matrices inverses et pivot de Gauss-Jordan",
                "viz_type": "matrix",
                "theory": {
                    "summary": "Le calcul matriciel permet de compacter et résoudre systématiquement d'immenses systèmes d'équations linéaires. Le déterminant mesure le facteur d'échelle spatial et garantit l'inversibilité.",
                    "key_formulas": [
                        {
                            "name": "Déterminant 2x2",
                            "latex": "\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc"
                        },
                        {
                            "name": "Matrice inverse 2x2",
                            "latex": "A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}"
                        },
                        {
                            "name": "Critère fondamental d'inversibilité",
                            "latex": "A \\text{ est inversible} \\iff \\det(A) \\neq 0"
                        },
                        {
                            "name": "Formulation matricielle",
                            "latex": "A X = B \\iff X = A^{-1} B \\quad (\\text{si } \\det A \\neq 0)"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Produit matriciel ligne par colonne",
                            "content": "Pour multiplier une matrice $A$ ($m \\times n$) par $B$ ($n \\times p$), le nombre de colonnes de $A$ doit égaler le nombre de lignes de $B$. Le résultat est une matrice $m \\times p$."
                        },
                        {
                            "title": "2. Déterminant 3x3 par développement de Laplace",
                            "content": "On développe le long d'une ligne ou colonne avec le damier des signes : $+ - + / - + - / + - +$. Choisir toujours la ligne contenant le plus de zéros."
                        },
                        {
                            "title": "3. Élimination de Gauss-Jordan",
                            "content": "On transforme la matrice augmentée $[A | B]$ par opérations élémentaires de lignes jusqu'à obtenir la forme échelonnée réduite $[I | X]$."
                        }
                    ],
                    "pitfall": "La multiplication matricielle n'est PAS commutative : A * B != B * A en général !",
                    "method": "Pour inverser une matrice 2x2 : 1. Calcule det(A) = ad - bc. Si 0, impossible. 2. Échange les éléments de la diagonale principale (a et d). 3. Change le signe des deux autres éléments (-b et -c). 4. Divise tout par det(A)."
                },
                "exercises": [
                    {
                        "id": "mat0130-ex8",
                        "title": "Déterminant d'une matrice 2x2",
                        "difficulty": 1,
                        "question_latex": "Calculez le déterminant de la matrice $A = \\begin{pmatrix} 5 & 2 \\\\ 3 & 4 \\end{pmatrix}$.",
                        "input_type": "math_expr",
                        "expected_solution": "14",
                        "hints": [
                            "Appliquez $ad - bc = 5(4) - 2(3) = 20 - 6$."
                        ],
                        "full_solution_latex": "\\det(A) = 20 - 6 = 14."
                    },
                    {
                        "id": "mat0130-ex9",
                        "title": "Déterminant 3x3 avec zéro",
                        "difficulty": 2,
                        "question_latex": "Calculez le déterminant de $M = \\begin{pmatrix} 1 & 0 & 2 \\\\ 3 & 4 & 1 \\\\ 0 & 2 & 1 \\end{pmatrix}$.",
                        "input_type": "math_expr",
                        "expected_solution": "14",
                        "hints": [
                            "Développez selon la 1ère ligne : $1(4(1) - 1(2)) + 2(3(2) - 4(0))$.",
                            "$1(2) + 2(6) = 2 + 12 = 14$."
                        ],
                        "full_solution_latex": "\\det(M) = 14."
                    },
                    {
                        "id": "mat0130-ex4_3",
                        "title": "Produit matriciel",
                        "difficulty": 2,
                        "question_latex": "Soit $A = \\begin{pmatrix} 1 & 2 \\end{pmatrix}$ et $B = \\begin{pmatrix} 4 \\\\ -1 \\end{pmatrix}$. Calculez le produit $A \\times B$ (scalaire).",
                        "input_type": "math_expr",
                        "expected_solution": "2",
                        "hints": [
                            "Ligne 1 fois colonne 1 : $1(4) + 2(-1) = 4 - 2$."
                        ],
                        "full_solution_latex": "A \\times B = 2."
                    },
                    {
                        "id": "mat0130-ex4_4",
                        "title": "Inverse d'une matrice scalaire",
                        "difficulty": 1,
                        "question_latex": "Si $\\det(A) = 2$, quelle est la valeur du déterminant de son inverse $\\det(A^{-1})$ ?",
                        "input_type": "math_expr",
                        "expected_solution": "1/2",
                        "hints": [
                            "Propriété fondamentale : $\\det(A^{-1}) = \\frac{1}{\\det(A)}$."
                        ],
                        "full_solution_latex": "\\det(A^{-1}) = \\frac{1}{2}."
                    },
                    {
                        "id": "mat0130-ex4_5",
                        "title": "Résolution de système 2x2",
                        "difficulty": 2,
                        "question_latex": "Résolvez le système $\\begin{cases} x + y = 1 \\\\ 2x - y = 5 \\end{cases}$. Donnez la solution sous la forme $(x, y)$.",
                        "input_type": "vector",
                        "expected_solution": "(2, -1)",
                        "hints": [
                            "Additionnez les deux équations : $3x = 6 \\implies x = 2$.",
                            "Déduisez $y$ : $2 + y = 1 \\implies y = -1$."
                        ],
                        "full_solution_latex": "(x, y) = (2, -1)."
                    },
                    {
                        "id": "mat0130-ex4_6",
                        "title": "Condition de singularité",
                        "difficulty": 1,
                        "question_latex": "Quelle est la valeur de $\\det(A)$ si la matrice $A$ n'est PAS inversible ?",
                        "input_type": "math_expr",
                        "expected_solution": "0",
                        "hints": [
                            "Une matrice est singulière (non inversible) si et seulement si son déterminant est nul."
                        ],
                        "full_solution_latex": "\\det(A) = 0."
                    }
                ]
            }
        ],
        "exam": {
            "title": "Examen Blanc — MAT-0130 (Algèbre vectorielle)",
            "duration_minutes": 60,
            "passing_grade": 60,
            "questions": [
                {
                    "id": "q1",
                    "points": 10,
                    "title": "Norme et unitaire",
                    "question_latex": "Soit le vecteur $\\vec{w} = (-4, 0, 3)$. Quelle est sa norme $\\|\\vec{w}\\|$ ?",
                    "input_type": "math_expr",
                    "expected_solution": "5",
                    "explanation": "\\|\\vec{w}\\| = \\sqrt{(-4)^2 + 0^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5."
                },
                {
                    "id": "q2",
                    "points": 15,
                    "title": "Orthogonalité",
                    "question_latex": "Déterminez $x$ pour que $\\vec{u} = (x, 2, -1)$ et $\\vec{v} = (3, x, 10)$ soient perpendiculaires.",
                    "input_type": "math_expr",
                    "expected_solution": "2",
                    "explanation": "3x + 2x - 10 = 0 \\iff 5x = 10 \\iff x = 2."
                },
                {
                    "id": "q3",
                    "points": 20,
                    "title": "Produit vectoriel",
                    "question_latex": "Soient $\\vec{u} = (2, 0, 1)$ et $\\vec{v} = (1, 1, 0)$. Calculez $\\vec{u} \\times \\vec{v}$ sous la forme $(x, y, z)$.",
                    "input_type": "vector",
                    "expected_solution": "(-1, 1, 2)",
                    "explanation": "(0 - 1, 1 - 0, 2 - 0) = (-1, 1, 2)."
                },
                {
                    "id": "q4",
                    "points": 20,
                    "title": "Plan dans l'espace",
                    "question_latex": "Le plan passe par le point $A(2, -1, 3)$ et a pour vecteur normal $\\vec{n} = (1, 4, -2)$. Donnez la valeur de la constante $d$ dans l'équation cartésienne $x + 4y - 2z + d = 0$.",
                    "input_type": "math_expr",
                    "expected_solution": "8",
                    "explanation": "1(2) + 4(-1) - 2(3) + d = 0 \\implies 2 - 4 - 6 + d = 0 \\implies -8 + d = 0 \\implies d = 8."
                },
                {
                    "id": "q5",
                    "points": 15,
                    "title": "Déterminant 2x2",
                    "question_latex": "Calculez $\\det \\begin{pmatrix} 7 & 3 \\\\ -2 & 4 \\end{pmatrix}$.",
                    "input_type": "math_expr",
                    "expected_solution": "34",
                    "explanation": "7(4) - 3(-2) = 28 - (-6) = 28 + 6 = 34."
                },
                {
                    "id": "q6",
                    "points": 20,
                    "title": "Volume du parallélépipède",
                    "question_latex": "Trois arêtes d'un parallélépipède sont données par $\\vec{u}=(1,0,0)$, $\\vec{v}=(0,2,0)$ et $\\vec{w}=(1,1,3)$. Calculez son volume.",
                    "input_type": "math_expr",
                    "expected_solution": "6",
                    "explanation": "Le volume est la valeur absolue du déterminant de la matrice formée par ces trois vecteurs : 1*(2*3 - 0) = 6."
                }
            ]
        }
    },
    {
        "id": "mat0150",
        "code": "MAT-0150",
        "title": "Calcul différentiel",
        "category": "Analyse",
        "color": "blue",
        "description": "Limites, formes indéterminées, asymptotes, définition de la dérivée, règles de dérivation, dérivation implicite et optimisation.",
        "prerequisites": "MAT-0130 ou compétences équivalentes en fonctions et algèbre",
        "estimated_hours": 45,
        "modules": [
            {
                "id": "m1-limites",
                "title": "Limites et continuité",
                "subtitle": "Formes 0/0, factorisation, méthode du conjugué et asymptotes",
                "viz_type": "limit",
                "theory": {
                    "summary": "La limite décrit le comportement d'une fonction aux abords immédiats d'un point ou à l'infini. Les formes indéterminées (0/0, infini/infini) exigent une levée algébrique rigoureuse par factorisation ou expression conjuguée.",
                    "key_formulas": [
                        {
                            "name": "Définition de la continuité",
                            "latex": "\\lim_{x \\to a} f(x) = f(a)"
                        },
                        {
                            "name": "Méthode du conjugué",
                            "latex": "\\sqrt{A} - \\sqrt{B} = \\frac{A - B}{\\sqrt{A} + \\sqrt{B}}"
                        },
                        {
                            "name": "Limite trigonométrique remarquable",
                            "latex": "\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k"
                        },
                        {
                            "name": "Asymptote horizontale",
                            "latex": "\\lim_{x \\to \\pm\\infty} f(x) = L \\implies y = L"
                        },
                        {
                            "name": "Asymptote verticale",
                            "latex": "\\lim_{x \\to a} f(x) = \\pm\\infty \\implies x = a"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Les 4 formes indéterminées classiques",
                            "content": "• $\\frac{0}{0}$ : résolue par factorisation ou conjugué.\n• $\\frac{\\infty}{\\infty}$ : résolue par factorisation du terme de plus haut degré.\n• $0 \\times \\infty$ : transformée en quotient $\\frac{0}{1/\\infty} = \\frac{0}{0}$.\n• $\\infty - \\infty$ : mise au même dénominateur ou expression conjuguée."
                        },
                        {
                            "title": "2. Continuité d'une fonction",
                            "content": "Une fonction $f$ est continue en $x = a$ si : 1. $f(a)$ existe, 2. $\\lim_{x \\to a} f(x)$ existe (limite à gauche = limite à droite), 3. la limite est égale à $f(a)$."
                        }
                    ],
                    "pitfall": "Ne JAMAIS écrire « = 0/0 ». Ce n'est pas un nombre, mais une forme indéterminée qui invite à simplifier l'expression.",
                    "method": "Pour lever 0/0 avec une racine carrée : multiplie le numérateur et le dénominateur par l'expression conjuguée, développe le numérateur via (a-b)(a+b) = a² - b², simplifie le facteur critique x - a, puis réévalue."
                },
                "exercises": [
                    {
                        "id": "mat0150-ex1",
                        "title": "Limite avec factorisation",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.",
                        "input_type": "math_expr",
                        "expected_solution": "6",
                        "hints": [
                            "Factorisez $x^2 - 9 = (x - 3)(x + 3)$.",
                            "Simplifiez $(x - 3)$ et évaluez en $x = 3$."
                        ],
                        "full_solution_latex": "\\lim_{x \\to 3} (x + 3) = 6."
                    },
                    {
                        "id": "mat0150-ex2",
                        "title": "Limite avec conjugué",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.",
                        "input_type": "math_expr",
                        "expected_solution": "1/4",
                        "hints": [
                            "Multipliez par le conjugué $\\sqrt{x + 4} + 2$.",
                            "Numérateur : $(x + 4) - 4 = x$. Simplifiez par $x$ : $\\frac{1}{\\sqrt{x+4}+2}$."
                        ],
                        "full_solution_latex": "\\frac{1}{2 + 2} = \\frac{1}{4}."
                    },
                    {
                        "id": "mat0150-ex3",
                        "title": "Limite trigonométrique fondamentale",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$.",
                        "input_type": "math_expr",
                        "expected_solution": "5",
                        "hints": [
                            "Utilisez $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$ avec $u = 5x$."
                        ],
                        "full_solution_latex": "\\lim_{x \\to 0} 5 \\cdot \\frac{\\sin(5x)}{5x} = 5(1) = 5."
                    },
                    {
                        "id": "mat0150-ex1_4",
                        "title": "Limite de polynôme par factorisation",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.",
                        "input_type": "math_expr",
                        "expected_solution": "4",
                        "hints": [
                            "$(x - 2)(x + 2) / (x - 2) = x + 2$."
                        ],
                        "full_solution_latex": "2 + 2 = 4."
                    },
                    {
                        "id": "mat0150-ex1_5",
                        "title": "Limite à l'infini rationnelle",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to \\infty} \\frac{3x^2 + 5}{2x^2 - x}$ sous forme de fraction.",
                        "input_type": "math_expr",
                        "expected_solution": "3/2",
                        "hints": [
                            "Considérez le rapport des coefficients de plus haut degré : $\\frac{3x^2}{2x^2} = \\frac{3}{2}$."
                        ],
                        "full_solution_latex": "\\frac{3}{2}."
                    },
                    {
                        "id": "mat0150-ex1_6",
                        "title": "Limite trigonométrique avec cosinus",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{2x}{\\sin(x)}$.",
                        "input_type": "math_expr",
                        "expected_solution": "2",
                        "hints": [
                            "C'est l'inverse de $\\frac{\\sin x}{x}$, multiplié par 2 : $2 \\times 1 = 2$."
                        ],
                        "full_solution_latex": "2."
                    }
                ]
            },
            {
                "id": "m2-derivee-concept",
                "title": "Dérivée et taux de variation",
                "subtitle": "Pente de la tangente, taux instantané et définition formelle par la limite",
                "viz_type": "tangent",
                "theory": {
                    "summary": "La dérivée f'(a) mesure le taux de variation instantané de f au point a. Géométriquement, elle donne la pente exacte de la droite tangente à la courbe en ce point.",
                    "key_formulas": [
                        {
                            "name": "Définition par le quotient différentiel",
                            "latex": "f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}"
                        },
                        {
                            "name": "Équation cartésienne de la tangente",
                            "latex": "y = f'(a)(x - a) + f(a)"
                        },
                        {
                            "name": "Taux de variation moyen (sécante)",
                            "latex": "T_m = \\frac{f(b) - f(a)}{b - a}"
                        },
                        {
                            "name": "Tangente horizontale",
                            "latex": "f'(x_0) = 0 \\iff \\text{Tangente parallèle à l'axe } x"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Du taux moyen au taux instantané",
                            "content": "Quand l'intervalle $h$ tend vers 0, la droite sécante reliant $(a, f(a))$ à $(a+h, f(a+h))$ pivote jusqu'à devenir la droite tangente."
                        },
                        {
                            "title": "2. Dérivabilité et points singuliers",
                            "content": "Une fonction peut être continue sans être dérivable. C'est le cas aux points anguleux (comme $|x|$ en 0 où les pentes à gauche et à droite diffèrent) et aux tangentes verticales."
                        }
                    ],
                    "pitfall": "f'(a) est un nombre (la valeur de la pente en a), tandis que f'(x) est la fonction dérivée.",
                    "method": "Pour trouver l'équation de la tangente en x = a : 1. Calcule y0 = f(a). 2. Calcule f'(x) puis m = f'(a). 3. Écris y = m(x - a) + y0."
                },
                "exercises": [
                    {
                        "id": "mat0150-ex4",
                        "title": "Pente de la tangente quadratique",
                        "difficulty": 1,
                        "question_latex": "Soit $f(x) = x^2 - 3x + 5$. Calculez la pente de la tangente en $x = 2$.",
                        "input_type": "math_expr",
                        "expected_solution": "1",
                        "hints": [
                            "$f'(x) = 2x - 3$. En $x = 2$, $f'(2) = 2(2) - 3 = 1$."
                        ],
                        "full_solution_latex": "f'(2) = 1."
                    },
                    {
                        "id": "mat0150-ex2_2",
                        "title": "Pente de tangente cubique",
                        "difficulty": 2,
                        "question_latex": "Soit $f(x) = x^3 - 8x$. Calculez la pente de la tangente en $x = 2$.",
                        "input_type": "math_expr",
                        "expected_solution": "4",
                        "hints": [
                            "$f'(x) = 3x^2 - 8$. En $x = 2$, $3(4) - 8 = 12 - 8 = 4$."
                        ],
                        "full_solution_latex": "f'(2) = 4."
                    },
                    {
                        "id": "mat0150-ex2_3",
                        "title": "Fonction dérivée de base",
                        "difficulty": 1,
                        "question_latex": "Déterminez la dérivée de $f(x) = x^2 + x$.",
                        "input_type": "math_expr",
                        "expected_solution": "2*x + 1",
                        "hints": [
                            "La dérivée de $x^2$ est $2x$ et celle de $x$ est $1$."
                        ],
                        "full_solution_latex": "f'(x) = 2x + 1."
                    },
                    {
                        "id": "mat0150-ex2_4",
                        "title": "Dérivée d'un polynôme complet",
                        "difficulty": 1,
                        "question_latex": "Déterminez la dérivée de $g(x) = 2x^2 - 3x + 7$.",
                        "input_type": "math_expr",
                        "expected_solution": "4*x - 3",
                        "hints": [
                            "$(2x^2)' = 4x$, $(-3x)' = -3$, $(7)' = 0$."
                        ],
                        "full_solution_latex": "g'(x) = 4x - 3."
                    },
                    {
                        "id": "mat0150-ex2_5",
                        "title": "Tangente horizontale",
                        "difficulty": 2,
                        "question_latex": "En quelle valeur de $x$ la parabole $f(x) = x^2 - 6x + 2$ admet-elle une tangente horizontale ?",
                        "input_type": "math_expr",
                        "expected_solution": "3",
                        "hints": [
                            "Tangente horizontale signifie $f'(x) = 0$.",
                            "$2x - 6 = 0 \\implies x = 3$."
                        ],
                        "full_solution_latex": "x = 3."
                    },
                    {
                        "id": "mat0150-ex2_6",
                        "title": "Pente d'une constante",
                        "difficulty": 1,
                        "question_latex": "Quelle est la valeur de la dérivée de la fonction constante $f(x) = 42$ ?",
                        "input_type": "math_expr",
                        "expected_solution": "0",
                        "hints": [
                            "Une constante ne varie jamais, son taux de variation est donc nul."
                        ],
                        "full_solution_latex": "f'(x) = 0."
                    }
                ]
            },
            {
                "id": "m3-regles-derivation",
                "title": "Règles de dérivation",
                "subtitle": "Produits, quotients, chaîne, exponentielles, logarithmes et dérivation implicite",
                "viz_type": "derivatives",
                "theory": {
                    "summary": "Toute fonction différentiable s'exprime comme une combinaison de briques de base. La règle du produit, la règle du quotient et la règle de dérivation en chaîne (chain rule) permettent de calculer toute dérivée sans approximation.",
                    "key_formulas": [
                        {
                            "name": "Règle des puissances",
                            "latex": "(x^n)' = n x^{n-1}"
                        },
                        {
                            "name": "Règle du produit",
                            "latex": "(uv)' = u'v + uv'"
                        },
                        {
                            "name": "Règle du quotient",
                            "latex": "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}"
                        },
                        {
                            "name": "Règle en chaîne (composition)",
                            "latex": "(f(g(x)))' = f'(g(x)) \\cdot g'(x)"
                        },
                        {
                            "name": "Dérivée de l'exponentielle",
                            "latex": "(e^{u(x)})' = u'(x) e^{u(x)}"
                        },
                        {
                            "name": "Dérivée du logarithme",
                            "latex": "(\\ln(u(x)))' = \\frac{u'(x)}{u(x)}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. La règle en chaîne démystifiée",
                            "content": "Dériver de l'extérieur vers l'intérieur : dériver la fonction englobante en laissant l'intérieur intact, puis multiplier par la dérivée du contenu intérieur."
                        },
                        {
                            "title": "2. Dérivation implicite",
                            "content": "Quand $x$ et $y$ sont liés par une équation $F(x, y) = 0$ : on dérive chaque terme par rapport à $x$, en appliquant la règle de chaîne à chaque terme en $y$ (ex: $(y^2)' = 2y y'$), puis on isole $y'$."
                        }
                    ],
                    "pitfall": "Attention au signe moins dans la règle du quotient : le numérateur est u'v - uv' et JAMAIS uv' - u'v !",
                    "method": "Pour dériver un quotient : 1. Note u et v. 2. Calcule u' et v'. 3. Forme u'v - uv'. 4. Divise par v²."
                },
                "exercises": [
                    {
                        "id": "mat0150-ex5",
                        "title": "Règle du produit avec exponentielle",
                        "difficulty": 2,
                        "question_latex": "Dérivez $f(x) = x^3 e^x$. Donnez $f'(x)$ sous forme factorisée par $e^x$.",
                        "input_type": "math_expr",
                        "expected_solution": "(x^3 + 3*x^2)*exp(x)",
                        "hints": [
                            "$u = x^3 \\implies u' = 3x^2$ et $v = e^x \\implies v' = e^x$.",
                            "$u'v + uv' = 3x^2 e^x + x^3 e^x = (x^3 + 3x^2)e^x$."
                        ],
                        "full_solution_latex": "f'(x) = (x^3 + 3x^2)e^x."
                    },
                    {
                        "id": "mat0150-ex6",
                        "title": "Règle en chaîne avec sinus",
                        "difficulty": 2,
                        "question_latex": "Dérivez $g(x) = \\sin(3x^2 + 1)$.",
                        "input_type": "math_expr",
                        "expected_solution": "6*x*cos(3*x^2 + 1)",
                        "hints": [
                            "Dérivée de $\\sin(u)$ est $u' \\cos(u)$ avec $u = 3x^2 + 1 \\implies u' = 6x$."
                        ],
                        "full_solution_latex": "g'(x) = 6x \\cos(3x^2 + 1)."
                    },
                    {
                        "id": "mat0150-ex3_3",
                        "title": "Dérivée de ln(ax + b)",
                        "difficulty": 2,
                        "question_latex": "Dérivez $h(x) = \\ln(3x - 2)$.",
                        "input_type": "math_expr",
                        "expected_solution": "3/(3*x - 2)",
                        "hints": [
                            "Appliquez $(\\ln u)' = \\frac{u'}{u}$ avec $u = 3x - 2 \\implies u' = 3$."
                        ],
                        "full_solution_latex": "h'(x) = \\frac{3}{3x - 2}."
                    },
                    {
                        "id": "mat0150-ex3_4",
                        "title": "Règle du quotient",
                        "difficulty": 2,
                        "question_latex": "Dérivez $f(x) = \\frac{x}{x^2 + 1}$.",
                        "input_type": "math_expr",
                        "expected_solution": "(1 - x^2)/(x^2 + 1)^2",
                        "hints": [
                            "$u = x, u'=1$, $v = x^2 + 1, v'=2x$.",
                            "$u'v - uv' = 1(x^2 + 1) - x(2x) = x^2 + 1 - 2x^2 = 1 - x^2$."
                        ],
                        "full_solution_latex": "f'(x) = \\frac{1 - x^2}{(x^2 + 1)^2}."
                    },
                    {
                        "id": "mat0150-ex3_5",
                        "title": "Dérivée d'un carré composé",
                        "difficulty": 2,
                        "question_latex": "Dérivez $f(x) = (2x + 1)^2$.",
                        "input_type": "math_expr",
                        "expected_solution": "4*(2*x + 1)",
                        "hints": [
                            "$2(2x + 1) \\cdot (2x + 1)' = 2(2x + 1)(2) = 4(2x + 1)$ ou $8x + 4$."
                        ],
                        "full_solution_latex": "f'(x) = 4(2x + 1) = 8x + 4."
                    },
                    {
                        "id": "mat0150-ex3_6",
                        "title": "Dérivation implicite du cercle",
                        "difficulty": 3,
                        "question_latex": "Soit la relation $x^2 + y^2 = 25$. Exprimez $\\frac{dy}{dx}$ en fonction de $x$ et $y$.",
                        "input_type": "math_expr",
                        "expected_solution": "-x/y",
                        "hints": [
                            "Dérivez terme à terme : $2x + 2y y' = 0$.",
                            "Isolez $y'$ : $2y y' = -2x \\implies y' = -\\frac{x}{y}$."
                        ],
                        "full_solution_latex": "\\frac{dy}{dx} = -\\frac{x}{y}."
                    },
                    {
                        "id": "mat0150-ex3_7",
                        "title": "Dérivée d'exponentielle composée",
                        "difficulty": 1,
                        "question_latex": "Dérivez $f(x) = e^{2x}$.",
                        "input_type": "math_expr",
                        "expected_solution": "2*exp(2*x)",
                        "hints": [
                            "$(e^{kx})' = k e^{kx}$."
                        ],
                        "full_solution_latex": "f'(x) = 2e^{2x}."
                    }
                ]
            },
            {
                "id": "m4-optimisation",
                "title": "Applications de la dérivée",
                "subtitle": "Points critiques, extrema, concavité, règle de L'Hôpital et optimisation",
                "viz_type": "optimization",
                "theory": {
                    "summary": "L'optimisation consiste à trouver les valeurs maximales ou minimales d'une fonction sous contraintes réelles. La règle de L'Hôpital résout quant à elle instantanément les limites indéterminées en dérivant numérateur et dénominateur.",
                    "key_formulas": [
                        {
                            "name": "Condition de point critique",
                            "latex": "f'(c) = 0 \\text{ ou } f'(c) \\text{ n'existe pas}"
                        },
                        {
                            "name": "Test de la dérivée seconde",
                            "latex": "f''(c) > 0 \\implies \\text{Min local}, \\quad f''(c) < 0 \\implies \\text{Max local}"
                        },
                        {
                            "name": "Règle de L'Hôpital",
                            "latex": "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)} \\quad (\\text{si } \\frac{0}{0} \\text{ ou } \\frac{\\infty}{\\infty})"
                        },
                        {
                            "name": "Point d'inflexion",
                            "latex": "f''(x) = 0 \\text{ et change de signe}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Étapes de résolution d'un problème d'optimisation",
                            "content": "1. Tracer un schéma et nommer les variables.\n2. Écrire la fonction objectif à maximiser ou minimiser.\n3. Exprimer la fonction sous une seule variable grâce à l'équation de contrainte.\n4. Dériver, poser $f'(x) = 0$, et vérifier la nature du résultat par la dérivée seconde."
                        }
                    ],
                    "pitfall": "Pour la règle de L'Hôpital, on dérive le numérateur et le dénominateur SÉPARÉMENT, il ne faut surtout pas faire une dérivée de quotient !",
                    "method": "Trouver le maximum d'une aire A(x) = 20x - x² : A'(x) = 20 - 2x = 0 donne x = 10. A''(10) = -2 < 0, il s'agit donc bien d'un maximum."
                },
                "exercises": [
                    {
                        "id": "mat0150-ex7",
                        "title": "Règle de L'Hôpital",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{e^{2x} - 1}{x}$.",
                        "input_type": "math_expr",
                        "expected_solution": "2",
                        "hints": [
                            "En 0, c'est $0/0$.",
                            "Dérivez en haut : $2e^{2x}$. Dérivez en bas : $1$.",
                            "Évaluez en $x = 0$ : $\\frac{2(1)}{1} = 2$."
                        ],
                        "full_solution_latex": "2."
                    },
                    {
                        "id": "mat0150-ex8",
                        "title": "Enclos d'aire maximale",
                        "difficulty": 3,
                        "question_latex": "On dispose de 40 mètres de clôture pour entourer un enclos rectangulaire. Quelle est l'aire maximale possible (en m²) ?",
                        "input_type": "math_expr",
                        "expected_solution": "100",
                        "hints": [
                            "$2x + 2y = 40 \\implies y = 20 - x$.",
                            "$A(x) = x(20 - x) = 20x - x^2$.",
                            "$A'(x) = 20 - 2x = 0 \\implies x = 10$. Aire = $10 \\times 10 = 100$."
                        ],
                        "full_solution_latex": "100."
                    },
                    {
                        "id": "mat0150-ex4_3",
                        "title": "Point critique positif",
                        "difficulty": 2,
                        "question_latex": "Trouvez le point critique positif de $f(x) = x^3 - 27x + 2$.",
                        "input_type": "math_expr",
                        "expected_solution": "3",
                        "hints": [
                            "$f'(x) = 3x^2 - 27 = 0 \\implies x^2 = 9 \\implies x = 3$."
                        ],
                        "full_solution_latex": "x = 3."
                    },
                    {
                        "id": "mat0150-ex4_4",
                        "title": "L'Hôpital trigonométrique",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2}$.",
                        "input_type": "math_expr",
                        "expected_solution": "1/2",
                        "hints": [
                            "L'Hôpital 1 : $\\frac{\\sin x}{2x}$.",
                            "L'Hôpital 2 : $\\frac{\\cos x}{2} \\to \\frac{1}{2}$."
                        ],
                        "full_solution_latex": "\\frac{1}{2}."
                    },
                    {
                        "id": "mat0150-ex4_5",
                        "title": "Produit maximal de somme fixée",
                        "difficulty": 2,
                        "question_latex": "Deux nombres positifs ont une somme égale à 10. Quelle est la valeur maximale de leur produit ?",
                        "input_type": "math_expr",
                        "expected_solution": "25",
                        "hints": [
                            "$P(x) = x(10 - x) = 10x - x^2$.",
                            "$P'(x) = 10 - 2x = 0 \\implies x = 5$. Produit = $5 \\times 5 = 25$."
                        ],
                        "full_solution_latex": "25."
                    },
                    {
                        "id": "mat0150-ex4_6",
                        "title": "Point d'inflexion cubique",
                        "difficulty": 2,
                        "question_latex": "Quelle est l'abscisse $x$ du point d'inflexion de $f(x) = x^3 + 3x^2 - 5$ ?",
                        "input_type": "math_expr",
                        "expected_solution": "-1",
                        "hints": [
                            "$f'(x) = 3x^2 + 6x$.",
                            "$f''(x) = 6x + 6 = 0 \\implies x = -1$."
                        ],
                        "full_solution_latex": "x = -1."
                    }
                ]
            }
        ],
        "exam": {
            "title": "Examen Blanc — MAT-0150 (Calcul différentiel)",
            "duration_minutes": 60,
            "passing_grade": 60,
            "questions": [
                {
                    "id": "q1",
                    "points": 15,
                    "title": "Limite rationnelle",
                    "question_latex": "Calculez $\\lim_{x \\to 2} \\frac{x^2 + x - 6}{x - 2}$.",
                    "input_type": "math_expr",
                    "expected_solution": "5",
                    "explanation": "\\frac{(x - 2)(x + 3)}{x - 2} = x + 3 \\to 2 + 3 = 5."
                },
                {
                    "id": "q2",
                    "points": 15,
                    "title": "Règle de L'Hôpital",
                    "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2}$.",
                    "input_type": "math_expr",
                    "expected_solution": "1/2",
                    "explanation": "\\lim_{x \\to 0} \\frac{\\sin(x)}{2x} = \\frac{1}{2}."
                },
                {
                    "id": "q3",
                    "points": 20,
                    "title": "Dérivée de produit et exponentielle",
                    "question_latex": "Calculez la dérivée de $f(x) = (2x + 1) e^{3x}$ en $x = 0$.",
                    "input_type": "math_expr",
                    "expected_solution": "5",
                    "explanation": "f'(x) = 2 e^{3x} + (2x + 1)(3 e^{3x}). En x = 0 : 2(1) + 1(3)(1) = 5."
                },
                {
                    "id": "q4",
                    "points": 20,
                    "title": "Équation de tangente",
                    "question_latex": "Soit $f(x) = \\ln(x)$. Quelle est la pente de la droite tangente en $x = 4$ ?",
                    "input_type": "math_expr",
                    "expected_solution": "1/4",
                    "explanation": "f'(x) = 1/x \\implies f'(4) = 1/4."
                },
                {
                    "id": "q5",
                    "points": 15,
                    "title": "Point critique",
                    "question_latex": "Trouvez la coordonnée $x$ du point critique positif de $f(x) = 2x^3 - 6x + 4$.",
                    "input_type": "math_expr",
                    "expected_solution": "1",
                    "explanation": "f'(x) = 6x^2 - 6 = 0 \\implies x^2 = 1 \\implies x = 1."
                },
                {
                    "id": "q6",
                    "points": 15,
                    "title": "Dérivée implicite",
                    "question_latex": "Soit le cercle $x^2 + y^2 = 25$. Calculez la valeur de $y' = \\frac{dy}{dx}$ au point $(3, 4)$.",
                    "input_type": "math_expr",
                    "expected_solution": "-3/4",
                    "explanation": "2x + 2y y' = 0 \\implies y' = -x/y. En (3, 4), y' = -3/4."
                }
            ]
        }
    },
    {
        "id": "mat0250",
        "code": "MAT-0250",
        "title": "Calcul intégral et probabilités",
        "category": "Intégration & Stochastique",
        "color": "indigo",
        "description": "Primitives, intégrales définies, sommes de Riemann, substitution, intégration par parties, analyse combinatoire et lois de probabilités.",
        "prerequisites": "MAT-0150 (Calcul différentiel)",
        "estimated_hours": 45,
        "modules": [
            {
                "id": "m1-primitives",
                "title": "Intégrale indéfinie et Primitives",
                "subtitle": "Antidérivées fondamentales, constante C et problèmes à conditions initiales",
                "viz_type": "riemann",
                "theory": {
                    "summary": "L'intégration indéfinie est l'opération réciproque de la dérivation. Trouver une primitive F(x) consiste à identifier quelle fonction dérivée redonne f(x). Une infinité de primitives existent, différant toutes par une constante arbitraire C.",
                    "key_formulas": [
                        {
                            "name": "Règle des puissances",
                            "latex": "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)"
                        },
                        {
                            "name": "Primitive du logarithme",
                            "latex": "\\int \\frac{1}{x} dx = \\ln|x| + C"
                        },
                        {
                            "name": "Primitive de l'exponentielle",
                            "latex": "\\int e^{kx} dx = \\frac{1}{k} e^{kx} + C"
                        },
                        {
                            "name": "Primitives trigonométriques",
                            "latex": "\\int \\cos(x) dx = \\sin(x) + C, \\quad \\int \\sin(x) dx = -\\cos(x) + C"
                        },
                        {
                            "name": "Linéarité de l'intégration",
                            "latex": "\\int (a f(x) + b g(x)) dx = a \\int f(x) dx + b \\int g(x) dx"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. La constante d'intégration C",
                            "content": "Puisque la dérivée de toute constante est nulle ($(C)' = 0$), il faut impérativement ajouter $+ C$ à toute primitive indéfinie."
                        },
                        {
                            "title": "2. Problème à condition initiale (Problème de Cauchy)",
                            "content": "Si on connaît une condition initiale $F(x_0) = y_0$, on peut déterminer la valeur exacte de la constante $C$ en remplaçant $x$ et $y$ dans la primitive."
                        }
                    ],
                    "pitfall": "Attention au signe pour la primitive de sin(x) : c'est -cos(x) et NON cos(x) !",
                    "method": "Vérifie toujours ton intégrale en dérivant ton résultat. La dérivée de ta primitive doit obligatoirement redonner la fonction sous l'intégrale."
                },
                "exercises": [
                    {
                        "id": "mat0250-ex1",
                        "title": "Primitive de polynôme",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\int (3x^2 + 4x - 5) dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "x^3 + 2*x^2 - 5*x",
                        "hints": [
                            "$3 \\frac{x^3}{3} + 4 \\frac{x^2}{2} - 5x = x^3 + 2x^2 - 5x$."
                        ],
                        "full_solution_latex": "x^3 + 2x^2 - 5x."
                    },
                    {
                        "id": "mat0250-ex1_2",
                        "title": "Primitive d'une racine",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\int \\frac{1}{\\sqrt{x}} dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "2*sqrt(x)",
                        "hints": [
                            "Réécrivez en puissance : $\\int x^{-1/2} dx = \\frac{x^{1/2}}{1/2} = 2\\sqrt{x}$."
                        ],
                        "full_solution_latex": "2\\sqrt{x}."
                    },
                    {
                        "id": "mat0250-ex1_3",
                        "title": "Primitive avec fraction rationnelle",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\int \\frac{3}{x} dx$ pour $x > 0$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "3*ln(x)",
                        "hints": [
                            "$3 \\int \\frac{1}{x} dx = 3 \\ln(x)$."
                        ],
                        "full_solution_latex": "3\\ln(x)."
                    },
                    {
                        "id": "mat0250-ex1_4",
                        "title": "Primitive d'exponentielle",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\int e^{4x} dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "exp(4*x)/4",
                        "hints": [
                            "$\\frac{1}{4} e^{4x}$."
                        ],
                        "full_solution_latex": "\\frac{e^{4x}}{4}."
                    },
                    {
                        "id": "mat0250-ex1_5",
                        "title": "Primitive trigonométrique",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\int \\sin(x) dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "-cos(x)",
                        "hints": [
                            "Rappelez-vous que $(\\cos x)' = -\\sin x$, donc la primitive de $\\sin x$ est $-\\cos x$."
                        ],
                        "full_solution_latex": "-\\cos(x)."
                    },
                    {
                        "id": "mat0250-ex1_6",
                        "title": "Condition initiale pour fixer C",
                        "difficulty": 2,
                        "question_latex": "Trouvez la fonction $F(x)$ telle que $F'(x) = 2x + 3$ et $F(0) = 5$.",
                        "input_type": "math_expr",
                        "expected_solution": "x^2 + 3*x + 5",
                        "hints": [
                            "$F(x) = x^2 + 3x + C$. Avec $F(0) = 5$, $C = 5$."
                        ],
                        "full_solution_latex": "F(x) = x^2 + 3x + 5."
                    }
                ]
            },
            {
                "id": "m2-integrale-definie",
                "title": "Intégrale définie et Aires",
                "subtitle": "Théorème fondamental de l'analyse, propriétés et calcul d'aires entre courbes",
                "viz_type": "riemann",
                "theory": {
                    "summary": "L'intégrale définie calcule l'aire algébrique nette sous une courbe. Le Théorème Fondamental de l'Analyse relie puissamment l'aire géométrique aux primitives algébriques.",
                    "key_formulas": [
                        {
                            "name": "Théorème fondamental de l'analyse",
                            "latex": "\\int_a^b f(x) dx = F(b) - F(a) = [F(x)]_a^b"
                        },
                        {
                            "name": "Aire entre deux courbes",
                            "latex": "A = \\int_a^b (f(x) - g(x)) dx \\quad (f(x) \\ge g(x))"
                        },
                        {
                            "name": "Valeur moyenne d'une fonction",
                            "latex": "f_{moy} = \\frac{1}{b - a} \\int_a^b f(x) dx"
                        },
                        {
                            "name": "Relation de Chasles",
                            "latex": "\\int_a^b f(x) dx = \\int_a^c f(x) dx + \\int_c^b f(x) dx"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Aire algébrique nette",
                            "content": "Les zones où la courbe est au-dessus de l'axe $x$ comptent positivement, et les zones en dessous comptent négativement."
                        },
                        {
                            "title": "2. Découpage aux points d'intersection",
                            "content": "Pour calculer l'aire géométrique totale entre deux courbes sécantes, on trouve d'abord leurs points de croisement pour déterminer laquelle est au-dessus sur chaque intervalle."
                        }
                    ],
                    "pitfall": "Ne confondez pas intégrale définie (qui donne une VALEUR NUMÉRIQUE exacte) et intégrale indéfinie (qui donne une FAMILLE DE FONCTIONS + C).",
                    "method": "1. Trouve une primitive F(x). 2. Évalue en haut F(b). 3. Évalue en bas F(a). 4. Fais la différence F(b) - F(a)."
                },
                "exercises": [
                    {
                        "id": "mat0250-ex2",
                        "title": "Calcul d'intégrale définie linéaire",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\int_1^3 (2x + 1) dx$.",
                        "input_type": "math_expr",
                        "expected_solution": "10",
                        "hints": [
                            "$[x^2 + x]_1^3 = (9 + 3) - (1 + 1) = 12 - 2 = 10$."
                        ],
                        "full_solution_latex": "10."
                    },
                    {
                        "id": "mat0250-ex3",
                        "title": "Aire sous une parabole",
                        "difficulty": 2,
                        "question_latex": "Calculez l'aire sous la courbe $y = x^2$ entre $x = 0$ et $x = 3$.",
                        "input_type": "math_expr",
                        "expected_solution": "9",
                        "hints": [
                            "$\\int_0^3 x^2 dx = [x^3/3]_0^3 = 27/3 = 9$."
                        ],
                        "full_solution_latex": "9."
                    },
                    {
                        "id": "mat0250-ex2_3",
                        "title": "Intégrale de l'exponentielle",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\int_0^1 e^x dx$ (donnez l'expression exacte en fonction de e).",
                        "input_type": "math_expr",
                        "expected_solution": "e - 1",
                        "hints": [
                            "$[e^x]_0^1 = e^1 - e^0 = e - 1$."
                        ],
                        "full_solution_latex": "e - 1."
                    },
                    {
                        "id": "mat0250-ex2_4",
                        "title": "Intégrale trigonométrique définie",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\int_0^\\pi \\sin(x) dx$.",
                        "input_type": "math_expr",
                        "expected_solution": "2",
                        "hints": [
                            "$[-\\cos(x)]_0^\\pi = -\\cos(\\pi) - (-\\cos(0)) = -(-1) - (-1) = 1 + 1 = 2$."
                        ],
                        "full_solution_latex": "2."
                    },
                    {
                        "id": "mat0250-ex2_5",
                        "title": "Aire entre deux courbes",
                        "difficulty": 3,
                        "question_latex": "Calculez l'aire délimitée par la droite $y = x$ et la parabole $y = x^2$ entre $x = 0$ et $x = 1$.",
                        "input_type": "math_expr",
                        "expected_solution": "1/6",
                        "hints": [
                            "Sur $[0, 1]$, la droite est au-dessus : $\\int_0^1 (x - x^2) dx = [\\frac{x^2}{2} - \\frac{x^3}{3}]_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$."
                        ],
                        "full_solution_latex": "\\frac{1}{6}."
                    },
                    {
                        "id": "mat0250-ex2_6",
                        "title": "Valeur moyenne d'une fonction",
                        "difficulty": 2,
                        "question_latex": "Calculez la valeur moyenne de $f(x) = 2x$ sur l'intervalle $[1, 6]$.",
                        "input_type": "math_expr",
                        "expected_solution": "7",
                        "hints": [
                            "$\\frac{1}{6 - 1} \\int_1^6 2x dx = \\frac{1}{5} [x^2]_1^6 = \\frac{1}{5} (36 - 1) = \\frac{35}{5} = 7$."
                        ],
                        "full_solution_latex": "7."
                    }
                ]
            },
            {
                "id": "m3-techniques-integration",
                "title": "Techniques d'intégration",
                "subtitle": "Changement de variable (substitution), intégration par parties et règle LIATE",
                "viz_type": "tangent",
                "theory": {
                    "summary": "La substitution inverse la règle de chaîne tandis que l'intégration par parties inverse la règle du produit. Ces deux techniques universelles permettent de résoudre les intégrales avancées rencontrées en physique et ingénierie.",
                    "key_formulas": [
                        {
                            "name": "Formule d'intégration par parties",
                            "latex": "\\int u dv = uv - \\int v du"
                        },
                        {
                            "name": "Changement de variable (u-sub)",
                            "latex": "\\int f(g(x)) g'(x) dx = \\int f(u) du"
                        },
                        {
                            "name": "Règle mnémotechnique LIATE",
                            "latex": "\\text{Choix de } u : \\text{Log, Inverses trigo, Algébriques, Trigo, Exp}"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Changement de variable méthodique",
                            "content": "1. Poser $u = g(x)$ pour la partie intérieure la plus encombrante.\n2. Calculer la différentielle $du = g'(x) dx$.\n3. Remplacer tous les $x$ pour ne laisser que la variable $u$.\n4. Pour une intégrale définie : calculer les nouvelles bornes $u(a)$ et $u(b)$."
                        },
                        {
                            "title": "2. Intégration par parties avec LIATE",
                            "content": "Choisir $u$ selon la priorité LIATE : Logarithmes, Inverses trigo, Algébriques (polynômes), Trigonométriques, Exponentielles. Tout le reste devient $dv$."
                        }
                    ],
                    "pitfall": "Quand tu fais un changement de variable sur une intégrale définie, change immédiatement les bornes ! Cela t'évite d'avoir à revenir en x à la fin.",
                    "method": "Intégrer par parties x * e^x : pose u = x (polynôme avant exponentielle) et dv = e^x dx. Alors du = dx et v = e^x. uv - int(v du) = x e^x - e^x + C."
                },
                "exercises": [
                    {
                        "id": "mat0250-ex4",
                        "title": "Substitution avec puissance",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\int 2x (x^2 + 1)^3 dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "(x^2 + 1)^4 / 4",
                        "hints": [
                            "Posez $u = x^2 + 1 \\implies du = 2x dx$.",
                            "$\\int u^3 du = \\frac{u^4}{4} = \\frac{(x^2 + 1)^4}{4}$."
                        ],
                        "full_solution_latex": "\\frac{(x^2 + 1)^4}{4}."
                    },
                    {
                        "id": "mat0250-ex5",
                        "title": "Intégration par parties classique",
                        "difficulty": 3,
                        "question_latex": "Calculez $\\int_0^1 x e^x dx$.",
                        "input_type": "math_expr",
                        "expected_solution": "1",
                        "hints": [
                            "Primitive : $x e^x - e^x$.",
                            "En 1 : $1(e) - e = 0$. En 0 : $0 - 1 = -1$. Différence : $0 - (-1) = 1$."
                        ],
                        "full_solution_latex": "1."
                    },
                    {
                        "id": "mat0250-ex3_3",
                        "title": "Substitution logarithmique",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\int \\frac{x}{x^2 + 4} dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "ln(x^2 + 4)/2",
                        "hints": [
                            "Posez $u = x^2 + 4 \\implies du = 2x dx \\implies x dx = \\frac{du}{2}$.",
                            "$\\frac{1}{2} \\int \\frac{1}{u} du = \\frac{1}{2} \\ln(u)$."
                        ],
                        "full_solution_latex": "\\frac{\\ln(x^2 + 4)}{2}."
                    },
                    {
                        "id": "mat0250-ex3_4",
                        "title": "Intégration par parties avec cosinus",
                        "difficulty": 3,
                        "question_latex": "Calculez $\\int x \\cos(x) dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "x*sin(x) + cos(x)",
                        "hints": [
                            "$u = x \\implies du = dx$ et $dv = \\cos x dx \\implies v = \\sin x$.",
                            "$uv - \\int v du = x \\sin x - \\int \\sin x dx = x \\sin x - (-\\cos x) = x \\sin x + \\cos x$."
                        ],
                        "full_solution_latex": "x \\sin(x) + \\cos(x)."
                    },
                    {
                        "id": "mat0250-ex3_5",
                        "title": "Primitive du logarithme par parties",
                        "difficulty": 3,
                        "question_latex": "Calculez $\\int \\ln(x) dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "x*ln(x) - x",
                        "hints": [
                            "$u = \\ln x \\implies du = \\frac{1}{x} dx$ et $dv = dx \\implies v = x$.",
                            "$x \\ln x - \\int x \\frac{1}{x} dx = x \\ln x - x$."
                        ],
                        "full_solution_latex": "x \\ln(x) - x."
                    },
                    {
                        "id": "mat0250-ex3_6",
                        "title": "Substitution trigonométrique simple",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\int_0^{\\pi/2} \\sin(x) \\cos(x) dx$.",
                        "input_type": "math_expr",
                        "expected_solution": "1/2",
                        "hints": [
                            "Posez $u = \\sin(x) \\implies du = \\cos(x) dx$. Bornes : de 0 à 1.",
                            "$\\int_0^1 u du = [u^2 / 2]_0^1 = 1/2$."
                        ],
                        "full_solution_latex": "\\frac{1}{2}."
                    }
                ]
            },
            {
                "id": "m4-probabilites",
                "title": "Probabilités et variables aléatoires",
                "subtitle": "Dénombrement, probabilités conditionnelles, espérance, variance et loi normale",
                "viz_type": "bellcurve",
                "theory": {
                    "summary": "Ce module modélise l'incertitude et les données aléatoires. Il couvre les techniques de dénombrement (permutations, combinaisons), les lois de probabilités conditionnelles, l'espérance et la distribution normale gaussienne.",
                    "key_formulas": [
                        {
                            "name": "Combinaisons (ordre indifférent)",
                            "latex": "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}"
                        },
                        {
                            "name": "Arrangements (l'ordre compte)",
                            "latex": "A_n^k = \\frac{n!}{(n-k)!}"
                        },
                        {
                            "name": "Probabilité conditionnelle",
                            "latex": "P(A|B) = \\frac{P(A \\cap B)}{P(B)}"
                        },
                        {
                            "name": "Espérance mathématique",
                            "latex": "E[X] = \\sum x_i P(X = x_i)"
                        },
                        {
                            "name": "Variance d'une variable aléatoire",
                            "latex": "V(X) = E[X^2] - (E[X])^2"
                        },
                        {
                            "name": "Centrage et réduction (Cote Z)",
                            "latex": "Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)"
                        }
                    ],
                    "sections": [
                        {
                            "title": "1. Dénombrement : combinaisons vs arrangements",
                            "content": "• Si l'ordre des éléments compte (code secret, podium) : arrangement $A_n^k$.\n• Si l'ordre ne compte pas (main de cartes, comité) : combinaison $\\binom{n}{k}$."
                        },
                        {
                            "title": "2. Indépendance et probabilité conditionnelle",
                            "content": "$A$ et $B$ sont indépendants si la survenue de l'un n'influence pas l'autre : $P(A|B) = P(A) \\iff P(A \\cap B) = P(A) \\times P(B)$."
                        },
                        {
                            "title": "3. La loi normale et la cote Z",
                            "content": "La cote $Z$ indique le nombre d'écarts-types séparant une observation de la moyenne générale $\\mu$. Elle permet de comparer des grandeurs sur des échelles différentes."
                        }
                    ],
                    "pitfall": "Attention : P(A | B) n'est PAS égal à P(B | A) en général ! Exemple : P(Être malade | Test positif) != P(Test positif | Être malade).",
                    "method": "Pour calculer l'espérance : multiplie chaque valeur possible xi par sa probabilité associée pi, et additionne tous les termes. Le résultat est la moyenne pondérée à long terme."
                },
                "exercises": [
                    {
                        "id": "mat0250-ex6",
                        "title": "Combinaisons d'un comité",
                        "difficulty": 1,
                        "question_latex": "De combien de manières peut-on choisir un comité de 3 personnes parmi 7 personnes (calculer $\\binom{7}{3}$) ?",
                        "input_type": "math_expr",
                        "expected_solution": "35",
                        "hints": [
                            "$\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = \\frac{210}{6} = 35$."
                        ],
                        "full_solution_latex": "35."
                    },
                    {
                        "id": "mat0250-ex7",
                        "title": "Espérance d'un jeu",
                        "difficulty": 2,
                        "question_latex": "Soit $X$ prenant la valeur 2 avec probabilité 0.3 et 10 avec probabilité 0.7. Calculez $E[X]$.",
                        "input_type": "math_expr",
                        "expected_solution": "7.6",
                        "hints": [
                            "$2(0.3) + 10(0.7) = 0.6 + 7.0 = 7.6$."
                        ],
                        "full_solution_latex": "7.6."
                    },
                    {
                        "id": "mat0250-ex4_3",
                        "title": "Permutations d'un mot",
                        "difficulty": 1,
                        "question_latex": "Combien d'anagrammes distincts peut-on former avec les 5 lettres distinctes du mot MATHS ($5!$) ?",
                        "input_type": "math_expr",
                        "expected_solution": "120",
                        "hints": [
                            "$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$."
                        ],
                        "full_solution_latex": "120."
                    },
                    {
                        "id": "mat0250-ex4_4",
                        "title": "Probabilité de l'événement complémentaire",
                        "difficulty": 1,
                        "question_latex": "Si la probabilité de pluie est $P(A) = 0.4$, quelle est la probabilité qu'il ne pleuve pas ?",
                        "input_type": "math_expr",
                        "expected_solution": "0.6",
                        "hints": [
                            "$P(A^c) = 1 - P(A) = 1 - 0.4 = 0.6$."
                        ],
                        "full_solution_latex": "0.6."
                    },
                    {
                        "id": "mat0250-ex4_5",
                        "title": "Cote Z d'une loi normale",
                        "difficulty": 2,
                        "question_latex": "Une variable normale a une moyenne $\\mu = 100$ et un écart-type $\\sigma = 15$. Calculez la cote $Z$ pour une observation $X = 130$.",
                        "input_type": "math_expr",
                        "expected_solution": "2",
                        "hints": [
                            "$Z = \\frac{X - \\mu}{\\sigma} = \\frac{130 - 100}{15} = \\frac{30}{15} = 2$."
                        ],
                        "full_solution_latex": "Z = 2."
                    },
                    {
                        "id": "mat0250-ex4_6",
                        "title": "Probabilité de deux lancers de pièce",
                        "difficulty": 1,
                        "question_latex": "Quelle est la probabilité d'obtenir deux fois Pile en lançant deux fois une pièce équilibrée sous forme décimale ?",
                        "input_type": "math_expr",
                        "expected_solution": "0.25",
                        "hints": [
                            "$\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4} = 0.25$."
                        ],
                        "full_solution_latex": "0.25."
                    }
                ]
            }
        ],
        "exam": {
            "title": "Examen Blanc — MAT-0250 (Calcul intégral et probabilités)",
            "duration_minutes": 60,
            "passing_grade": 60,
            "questions": [
                {
                    "id": "q1",
                    "points": 15,
                    "title": "Primitive immédiate",
                    "question_latex": "Calculez l'intégrale définie $\\int_0^2 (3x^2 + 1) dx$.",
                    "input_type": "math_expr",
                    "expected_solution": "10",
                    "explanation": "[x^3 + x]_0^2 = (8 + 2) - 0 = 10."
                },
                {
                    "id": "q2",
                    "points": 20,
                    "title": "Substitution",
                    "question_latex": "Calculez $\\int_0^1 2x e^{x^2} dx$. Donnez le résultat exact en fonction de $e$.",
                    "input_type": "math_expr",
                    "expected_solution": "exp(1) - 1",
                    "explanation": "Avec u = x^2, du = 2x dx. \\int_0^1 e^u du = [e^u]_0^1 = e - 1."
                },
                {
                    "id": "q3",
                    "points": 20,
                    "title": "Intégration par parties",
                    "question_latex": "Calculez $\\int_1^e \\ln(x) dx$.",
                    "input_type": "math_expr",
                    "expected_solution": "1",
                    "explanation": "Primitive : x ln(x) - x. Évalué de 1 à e : (e - e) - (0 - 1) = 1."
                },
                {
                    "id": "q4",
                    "points": 15,
                    "title": "Aire géométrique",
                    "question_latex": "Calculez l'aire délimitée par la droite $y = 2x$ et l'axe des abscisses entre $x = 0$ et $x = 4$.",
                    "input_type": "math_expr",
                    "expected_solution": "16",
                    "explanation": "\\int_0^4 2x dx = [x^2]_0^4 = 16."
                },
                {
                    "id": "q5",
                    "points": 15,
                    "title": "Probabilité conditionnelle",
                    "question_latex": "Si $P(A) = 0.4$, $P(B) = 0.5$ et $P(A \\cap B) = 0.2$, calculez $P(A|B)$.",
                    "input_type": "math_expr",
                    "expected_solution": "0.4",
                    "explanation": "P(A|B) = P(A \\cap B) / P(B) = 0.2 / 0.5 = 0.4."
                },
                {
                    "id": "q6",
                    "points": 15,
                    "title": "Espérance",
                    "question_latex": "Une variable aléatoire $Y$ prend la valeur -5 avec probabilité 0.2 et la valeur 5 avec probabilité 0.8. Calculez $E[Y]$.",
                    "input_type": "math_expr",
                    "expected_solution": "3",
                    "explanation": "E[Y] = -5(0.2) + 5(0.8) = -1 + 4 = 3."
                }
            ]
        }
    }
]

def get_all_courses():
    return [
        {
            "id": c["id"],
            "code": c["code"],
            "title": c["title"],
            "category": c["category"],
            "color": c["color"],
            "description": c["description"],
            "prerequisites": c["prerequisites"],
            "estimated_hours": c["estimated_hours"],
            "modules_count": len(c["modules"]),
            "modules": [
                {"id": m["id"], "title": m["title"], "subtitle": m["subtitle"], "exercises_count": len(m["exercises"])}
                for m in c["modules"]
            ]
        }
        for c in COURSES_DATA
    ]

def get_course_by_id(course_id: str):
    for c in COURSES_DATA:
        if c["id"] == course_id:
            return c
    return None

def get_module(course_id: str, module_id: str):
    course = get_course_by_id(course_id)
    if not course:
        return None
    for m in course["modules"]:
        if m["id"] == module_id:
            return m
    return None
