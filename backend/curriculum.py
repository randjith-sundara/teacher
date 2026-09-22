"""
Banque de cours, modules, exercices interactifs et examens universitaires pour :
- MAT-0130 : Algèbre vectorielle
- MAT-0150 : Calcul différentiel
- MAT-0250 : Calcul intégral et probabilités
"""

COURSES_DATA = [
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
                "subtitle": "Norme, combinaisons linéaires, produit scalaire et projection",
                "viz_type": "vector2d",
                "theory": {
                    "summary": "Un vecteur est défini par une direction, un sens et une norme (longueur). Le produit scalaire est l'outil fondamental pour tester l'orthogonalité et calculer des projections.",
                    "key_formulas": [
                        {"name": "Norme d'un vecteur", "latex": "\\|\\vec{u}\\| = \\sqrt{u_1^2 + u_2^2 + u_3^2}"},
                        {"name": "Produit scalaire", "latex": "\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = \\|\\vec{u}\\| \\|\\vec{v}\\| \\cos(\\theta)"},
                        {"name": "Projection orthogonale", "latex": "\\text{proj}_{\\vec{v}}(\\vec{u}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|^2} \\vec{v}"}
                    ],
                    "sections": [
                        {
                            "title": "1. Définition et composantes",
                            "content": "Soit deux points $A(x_A, y_A, z_A)$ et $B(x_B, y_B, z_B)$. Le vecteur $\\vec{AB}$ est donné par $\\vec{AB} = (x_B - x_A, y_B - y_A, z_B - z_A)$."
                        },
                        {
                            "title": "2. Critère d'orthogonalité",
                            "content": "Deux vecteurs non nuls $\\vec{u}$ et $\\vec{v}$ sont orthogonaux si et seulement si leur produit scalaire est nul : $\\vec{u} \\cdot \\vec{v} = 0$."
                        },
                        {
                            "title": "3. Vecteur unitaire (Normalisation)",
                            "content": "Pour obtenir un vecteur unitaire $\\vec{u}_0$ de même direction et même sens que $\\vec{u}$, on divise par sa norme : $\\vec{u}_0 = \\frac{\\vec{u}}{\\|\\vec{u}\\|}$."
                        }
                    ],
                    "pitfall": "Ne pas confondre le produit scalaire (dont le résultat est un nombre réel scalaire) et la multiplication d'un vecteur par un scalaire.",
                    "method": "Pour calculer la projection de $\\vec{u}$ sur $\\vec{v}$ : 1. Calcule $\\vec{u} \\cdot \\vec{v}$. 2. Calcule $\\|\\vec{v}\\|^2$. 3. Multiplie le quotient par le vecteur $\\vec{v}$."
                },
                "exercises": [
                    {
                        "id": "mat0130-ex1",
                        "title": "Norme d'un vecteur 3D",
                        "difficulty": 1,
                        "question_latex": "Soit le vecteur $\\vec{u} = (2, -3, 6)$. Calculez la norme $\\|\\vec{u}\\|$.",
                        "input_type": "math_expr",
                        "expected_solution": "7",
                        "hints": [
                            "Appliquez la formule $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$.",
                            "Calculez la somme des carrés : $2^2 + (-3)^2 + 6^2 = 4 + 9 + 36$."
                        ],
                        "full_solution_latex": "\\|\\vec{u}\\| = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7."
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
                            "Développez : $3(4) + k(-2) + (-2)(5) = 0$."
                        ],
                        "full_solution_latex": "\\vec{u} \\cdot \\vec{v} = 12 - 2k - 10 = 2 - 2k = 0 \\implies k = 1."
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
                        "full_solution_latex": "\\text{proj}_{\\vec{v}}(\\vec{u}) = \\frac{14}{10}(3, 1) = \\frac{7}{5}(3, 1) = \\left(\\frac{21}{5}, \\frac{7}{5}\\right)."
                    }
                ]
            },
            {
                "id": "m2-produit-vectoriel",
                "title": "Produit vectoriel et produit mixte",
                "subtitle": "Vecteur normal, aire de parallélogramme et volume",
                "viz_type": "vector3d",
                "theory": {
                    "summary": "Le produit vectoriel $\\vec{u} \\times \\vec{v}$ produit un vecteur orthogonal à la fois à $\\vec{u}$ et $\\vec{v}$. Sa norme correspond à l'aire du parallélogramme engendré.",
                    "key_formulas": [
                        {"name": "Produit vectoriel", "latex": "\\vec{u} \\times \\vec{v} = (u_2 v_3 - u_3 v_2, u_3 v_1 - u_1 v_3, u_1 v_2 - u_2 v_1)"},
                        {"name": "Norme du produit vectoriel", "latex": "\\|\\vec{u} \\times \\vec{v}\\| = \\|\\vec{u}\\| \\|\\vec{v}\\| \\sin(\\theta) = \\text{Aire}"},
                        {"name": "Produit mixte (Volume)", "latex": "V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})|"}
                    ],
                    "sections": [
                        {
                            "title": "1. Propriétés clés",
                            "content": "Le produit vectoriel est anticommutatif : $\\vec{v} \\times \\vec{u} = -(\\vec{u} \\times \\vec{v})$. Deux vecteurs sont colinéaires si et seulement si $\\vec{u} \\times \\vec{v} = \\vec{0}$."
                        },
                        {
                            "title": "2. Règle de la main droite",
                            "content": "Le sens du vecteur résultat $\\vec{u} \\times \\vec{v}$ est donné par la règle de la main droite : l'index pointe vers $\\vec{u}$, le majeur vers $\\vec{v}$, le pouce indique $\\vec{u} \\times \\vec{v}$."
                        }
                    ],
                    "pitfall": "Le produit vectoriel N'EXISTE QUE dans l'espace $\\mathbb{R}^3$, pas dans $\\mathbb{R}^2$ !",
                    "method": "Pour calculer $\\vec{u} \\times \\vec{v}$, écrivez la matrice $3 \\times 3$ avec la première ligne $(\\vec{i}, \\vec{j}, \\vec{k})$ et développez par cofacteurs."
                },
                "exercises": [
                    {
                        "id": "mat0130-ex4",
                        "title": "Calcul de produit vectoriel",
                        "difficulty": 2,
                        "question_latex": "Soient $\\vec{u} = (1, 2, 3)$ et $\\vec{v} = (4, 5, 6)$. Calculez $\\vec{u} \\times \\vec{v}$ sous la forme $(x, y, z)$.",
                        "input_type": "vector",
                        "expected_solution": "(-3, 6, -3)",
                        "hints": [
                            "$x = 2(6) - 3(5) = 12 - 15 = -3$.",
                            "$y = -(1(6) - 3(4)) = -(6 - 12) = 6$.",
                            "$z = 1(5) - 2(4) = 5 - 8 = -3$."
                        ],
                        "full_solution_latex": "\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{vmatrix} = (-3, 6, -3)."
                    },
                    {
                        "id": "mat0130-ex5",
                        "title": "Aire d'un triangle dans l'espace",
                        "difficulty": 2,
                        "question_latex": "Les vecteurs $\\vec{AB} = (1, 0, 2)$ et $\\vec{AC} = (0, 3, 1)$ forment un triangle $ABC$. Calculez son aire (utilisez sqrt(...) si nécessaire).",
                        "input_type": "math_expr",
                        "expected_solution": "sqrt(41)/2",
                        "hints": [
                            "L'aire du triangle vaut $\\frac{1}{2}\\|\\vec{AB} \\times \\vec{AC}\\|$.",
                            "$\\vec{AB} \\times \\vec{AC} = (0(1) - 2(3), 2(0) - 1(1), 1(3) - 0(0)) = (-6, -1, 3)$.",
                            "Calculez la norme $\\sqrt{(-6)^2 + (-1)^2 + 3^2}$."
                        ],
                        "full_solution_latex": "\\vec{AB} \\times \\vec{AC} = (-6, -1, 3). \\text{ Norme} = \\sqrt{36 + 1 + 9} = \\sqrt{41}. \\text{ Aire} = \\frac{\\sqrt{41}}{2}."
                    }
                ]
            },
            {
                "id": "m3-droites-plans",
                "title": "Droites et plans dans l'espace",
                "subtitle": "Équations cartésiennes, vecteur normal et distances",
                "viz_type": "planes",
                "theory": {
                    "summary": "Un plan est défini par un point $P_0$ et un vecteur normal $\\vec{n} = (a, b, c)$, menant à l'équation $ax + by + cz + d = 0$. Une droite est définie par un point et un vecteur directeur $\\vec{d}$.",
                    "key_formulas": [
                        {"name": "Équation cartésienne d'un plan", "latex": "a(x - x_0) + b(y - y_0) + c(z - z_0) = 0 \\iff ax + by + cz + d = 0"},
                        {"name": "Équations paramétriques de droite", "latex": "\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases}"},
                        {"name": "Distance d'un point à un plan", "latex": "D = \\frac{|ax_1 + by_1 + cz_1 + d|}{\\sqrt{a^2 + b^2 + c^2}}"}
                    ],
                    "sections": [
                        {
                            "title": "1. Vecteur normal d'un plan",
                            "content": "Pour trouver un vecteur normal à un plan contenant 3 points $A, B, C$, on effectue le produit vectoriel $\\vec{n} = \\vec{AB} \\times \\vec{AC}$."
                        },
                        {
                            "title": "2. Intersection droite-plan",
                            "content": "On substitue les coordonnées paramétriques de la droite dans l'équation cartésienne du plan pour résoudre la valeur du paramètre $t$."
                        }
                    ],
                    "pitfall": "Une droite dans $\\mathbb{R}^3$ NE PEUT PAS être représentée par une seule équation cartésienne. Elle nécessite un système de deux équations ou des équations symétriques !",
                    "method": "Pour trouver l'intersection d'une droite et d'un plan : injecte $x(t), y(t), z(t)$ dans l'équation du plan, isole $t$, puis réinjecte la valeur de $t$ dans les équations de la droite."
                },
                "exercises": [
                    {
                        "id": "mat0130-ex6",
                        "title": "Équation cartésienne de plan",
                        "difficulty": 2,
                        "question_latex": "Trouvez la valeur de $d$ dans l'équation du plan $2x - 3y + 4z + d = 0$ sachant qu'il passe par le point $P(1, 2, -1)$.",
                        "input_type": "math_expr",
                        "expected_solution": "8",
                        "hints": [
                            "Injectez les coordonnées de $P$ dans l'équation : $2(1) - 3(2) + 4(-1) + d = 0$.",
                            "$2 - 6 - 4 + d = 0 \\implies -8 + d = 0$."
                        ],
                        "full_solution_latex": "2(1) - 3(2) + 4(-1) + d = 0 \\implies 2 - 6 - 4 + d = 0 \\implies -8 + d = 0 \\implies d = 8."
                    },
                    {
                        "id": "mat0130-ex7",
                        "title": "Distance point-plan",
                        "difficulty": 3,
                        "question_latex": "Calculez la distance entre le point $A(1, 0, 2)$ et le plan $\\pi: 2x - y + 2z - 15 = 0$.",
                        "input_type": "math_expr",
                        "expected_solution": "3",
                        "hints": [
                            "Numérateur : $|2(1) - 0 + 2(2) - 15| = |2 + 4 - 15| = |-9| = 9$.",
                            "Dénominateur : $\\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{4 + 1 + 4} = \\sqrt{9} = 3$."
                        ],
                        "full_solution_latex": "D = \\frac{|2(1) - 0 + 2(2) - 15|}{\\sqrt{4 + 1 + 4}} = \\frac{|-9|}{3} = \\frac{9}{3} = 3."
                    }
                ]
            },
            {
                "id": "m4-matrices-systemes",
                "title": "Matrices et systèmes linéaires",
                "subtitle": "Élimination de Gauss-Jordan, déterminants et inverse",
                "viz_type": "matrix",
                "theory": {
                    "summary": "Les systèmes linéaires se résolvent de manière systématique par réduction échelonnée de Gauss-Jordan. Le déterminant mesure le facteur d'échelle des volumes et garantit l'inversibilité si non nul.",
                    "key_formulas": [
                        {"name": "Déterminant 2x2", "latex": "\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc"},
                        {"name": "Inverse d'une matrice 2x2", "latex": "A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}"},
                        {"name": "Théorème d'inversibilité", "latex": "A \\text{ est inversible} \\iff \\det(A) \\neq 0"}
                    ],
                    "sections": [
                        {
                            "title": "1. Opérations élémentaires de lignes",
                            "content": "$L_i \\leftrightarrow L_j$ (échange), $L_i \\leftarrow k L_i$ ($k \\neq 0$), $L_i \\leftarrow L_i + k L_j$."
                        },
                        {
                            "title": "2. Nature des solutions d'un système",
                            "content": "Un système linéaire possède soit une unique solution, soit une infinité de solutions (indéterminé), soit aucune solution (incompatible)."
                        }
                    ],
                    "pitfall": "Attention aux erreurs de signe lors du calcul des cofacteurs pour le déterminant $3 \\times 3$ : le damier des signes est $+ - + / - + - / + - +$.",
                    "method": "Pour inverser une matrice par Gauss : accole la matrice identité $[A | I]$ et applique les opérations de lignes jusqu'à obtenir $[I | A^{-1}]$."
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
                            "Appliquez la formule $ad - bc$.",
                            "$5(4) - 2(3) = 20 - 6$."
                        ],
                        "full_solution_latex": "\\det(A) = 5(4) - 2(3) = 20 - 6 = 14."
                    },
                    {
                        "id": "mat0130-ex9",
                        "title": "Déterminant d'une matrice 3x3",
                        "difficulty": 2,
                        "question_latex": "Calculez le déterminant de $M = \\begin{pmatrix} 1 & 0 & 2 \\\\ 3 & 4 & 1 \\\\ 0 & 2 & 1 \\end{pmatrix}$.",
                        "input_type": "math_expr",
                        "expected_solution": "16",
                        "hints": [
                            "Développez selon la première ligne : $1(4(1) - 1(2)) - 0(...) + 2(3(2) - 4(0))$.",
                            "$1(4 - 2) + 2(6) = 2 + 12$."
                        ],
                        "full_solution_latex": "\\det(M) = 1(4 - 2) - 0 + 2(6 - 0) = 2 + 12 = 14. (Vérification : 4 - 2 = 2 ; 2*(6-0)=12 -> 14)."
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
                "subtitle": "Formes 0/0, factorisation, conjugué et asymptotes",
                "viz_type": "limit",
                "theory": {
                    "summary": "La limite d'une fonction décrit son comportement à l'approche d'un point. Les formes indéterminées (0/0, ∞/∞) exigent une simplification algébrique rigoureuse.",
                    "key_formulas": [
                        {"name": "Définition de la continuité", "latex": "\\lim_{x \\to a} f(x) = f(a)"},
                        {"name": "Technique du conjugué", "latex": "\\sqrt{A} - \\sqrt{B} = \\frac{A - B}{\\sqrt{A} + \\sqrt{B}}"},
                        {"name": "Asymptote horizontale", "latex": "\\lim_{x \\to \\pm\\infty} f(x) = L \\implies y = L"}
                    ],
                    "sections": [
                        {
                            "title": "1. Formes indéterminées classiques",
                            "content": "Les formes $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $0 \\times \\infty$ et $\\infty - \\infty$ ne signifient pas que la limite n'existe pas, mais qu'une levée d'indétermination est nécessaire."
                        },
                        {
                            "title": "2. Méthodes de levée d'indétermination",
                            "content": "• Factorisation polynomiale (mise en évidence du facteur $(x - a)$ qui annule).\n• Multiplication par l'expression conjuguée lors de la présence de racines carrées.\n• Factorisation du terme prépondérant pour les limites à l'infini."
                        }
                    ],
                    "pitfall": "Ne jamais écrire « = 0/0 ». C'est une forme indéterminée, pas un nombre réel !",
                    "method": "Face à $\\lim_{x \\to a} \\frac{P(x)}{Q(x)}$ : commence par évaluer directement. Si $0/0$, factorise $(x-a)$ au numérateur et au dénominateur puis simplifie."
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
                            "Remarquez la différence de carrés : $x^2 - 9 = (x - 3)(x + 3)$.",
                            "Simplifiez $(x - 3)$ puis évaluez en $x = 3$."
                        ],
                        "full_solution_latex": "\\lim_{x \\to 3} \\frac{(x - 3)(x + 3)}{x - 3} = \\lim_{x \\to 3} (x + 3) = 3 + 3 = 6."
                    },
                    {
                        "id": "mat0150-ex2",
                        "title": "Limite avec conjugué",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{\\sqrt{x + 4} - 2}{x}$.",
                        "input_type": "math_expr",
                        "expected_solution": "1/4",
                        "hints": [
                            "Multipliez par le conjugué $\\sqrt{x + 4} + 2$ au numérateur et dénominateur.",
                            "Le numérateur devient $(x + 4) - 4 = x$.",
                            "Simplifiez par $x$ et évaluez."
                        ],
                        "full_solution_latex": "\\lim_{x \\to 0} \\frac{(\\sqrt{x+4}-2)(\\sqrt{x+4}+2)}{x(\\sqrt{x+4}+2)} = \\lim_{x \\to 0} \\frac{x}{x(\\sqrt{x+4}+2)} = \\frac{1}{2+2} = \\frac{1}{4}."
                    },
                    {
                        "id": "mat0150-ex3",
                        "title": "Limite trigonométrique fondamentale",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\lim_{x \\to 0} \\frac{\\sin(5x)}{x}$.",
                        "input_type": "math_expr",
                        "expected_solution": "5",
                        "hints": [
                            "Rappelez-vous la limite fondamentale : $\\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1$.",
                            "Écrivez $\\frac{\\sin(5x)}{x} = 5 \\cdot \\frac{\\sin(5x)}{5x}$."
                        ],
                        "full_solution_latex": "\\lim_{x \\to 0} 5 \\cdot \\frac{\\sin(5x)}{5x} = 5 \\cdot 1 = 5."
                    }
                ]
            },
            {
                "id": "m2-derivee-concept",
                "title": "Dérivée et taux de variation",
                "subtitle": "Pente de la tangente et taux de variation instantané",
                "viz_type": "tangent",
                "theory": {
                    "summary": "La dérivée d'une fonction en un point représente la pente de la droite tangente à la courbe en ce point, c'est-à-dire le taux de variation instantané.",
                    "key_formulas": [
                        {"name": "Définition formelle de la dérivée", "latex": "f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}"},
                        {"name": "Équation de la tangente", "latex": "y = f'(a)(x - a) + f(a)"},
                        {"name": "Pente de la sécante", "latex": "m_{sec} = \\frac{f(b) - f(a)}{b - a}"}
                    ],
                    "sections": [
                        {
                            "title": "1. Différentiabilité et continuité",
                            "content": "Si une fonction est dérivable en un point $a$, alors elle est obligatoirement continue en $a$. La réciproque est FAUSSE (ex: $f(x) = |x|$ en $x = 0$ est continue mais non dérivable car point de rebroussement)."
                        }
                    ],
                    "pitfall": "Ne pas confondre la dérivée en un point $f'(a)$ (qui est une constante réelle, la pente) et la fonction dérivée $f'(x)$ (qui est une fonction de $x$).",
                    "method": "Pour trouver l'équation de la tangente en $x = a$ : 1. Calcule $y_0 = f(a)$. 2. Calcule la dérivée $f'(x)$. 3. Évalue la pente $m = f'(a)$. 4. Écris $y - y_0 = m(x - a)$."
                },
                "exercises": [
                    {
                        "id": "mat0150-ex4",
                        "title": "Pente de la tangente",
                        "difficulty": 1,
                        "question_latex": "Soit $f(x) = x^2 - 3x + 5$. Calculez la pente de la tangente en $x = 2$.",
                        "input_type": "math_expr",
                        "expected_solution": "1",
                        "hints": [
                            "Dérivez $f(x)$ : $f'(x) = 2x - 3$.",
                            "Évaluez en $x = 2$."
                        ],
                        "full_solution_latex": "f'(x) = 2x - 3. \\text{ En } x = 2, f'(2) = 2(2) - 3 = 1."
                    }
                ]
            },
            {
                "id": "m3-regles-derivation",
                "title": "Règles de dérivation",
                "subtitle": "Produits, quotients, chaîne, exponentielles et dérivation implicite",
                "viz_type": "derivatives",
                "theory": {
                    "summary": "Maîtriser le formulaire de dérivation et la règle en chaîne est la clé pour dériver toute fonction complexe.",
                    "key_formulas": [
                        {"name": "Règle du produit", "latex": "(uv)' = u'v + uv'"},
                        {"name": "Règle du quotient", "latex": "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}"},
                        {"name": "Règle de dérivation en chaîne", "latex": "(f(g(x)))' = f'(g(x)) \\cdot g'(x)"},
                        {"name": "Dérivée de ln et exp", "latex": "(\\ln(x))' = \\frac{1}{x}, \\quad (e^x)' = e^x"}
                    ],
                    "sections": [
                        {
                            "title": "1. Règle de dérivation en chaîne",
                            "content": "On dérive la fonction extérieure en conservant l'intérieur, puis on multiplie par la dérivée de la fonction intérieure. Exemple : $( (2x + 1)^5 )' = 5(2x + 1)^4 \\cdot 2 = 10(2x + 1)^4$."
                        },
                        {
                            "title": "2. Dérivation implicite",
                            "content": "Lorsque $y$ est défini implicitement par une équation $F(x, y) = 0$, on dérive chaque terme par rapport à $x$ en appliquant la règle en chaîne pour tout terme contenant $y$ : $\\frac{d}{dx}[y^2] = 2y \\frac{dy}{dx}$."
                        }
                    ],
                    "pitfall": "Attention au signe moins dans la règle du quotient : c'est toujours $(u'v - uv') / v^2$ et JAMAIS $(uv' - u'v) / v^2$.",
                    "method": "Identifie la structure dominante : s'agit-il d'une puissance, d'un produit, d'un quotient ou d'une composition ?"
                },
                "exercises": [
                    {
                        "id": "mat0150-ex5",
                        "title": "Règle du produit",
                        "difficulty": 2,
                        "question_latex": "Dérivez $f(x) = x^3 e^x$. Donnez $f'(x)$ sous forme factorisée par $e^x$.",
                        "input_type": "math_expr",
                        "expected_solution": "(x^3 + 3*x^2)*exp(x)",
                        "hints": [
                            "Posez $u = x^3 \\implies u' = 3x^2$ et $v = e^x \\implies v' = e^x$.",
                            "$u'v + uv' = 3x^2 e^x + x^3 e^x$."
                        ],
                        "full_solution_latex": "f'(x) = 3x^2 e^x + x^3 e^x = (x^3 + 3x^2)e^x = x^2(x + 3)e^x."
                    },
                    {
                        "id": "mat0150-ex6",
                        "title": "Règle de chaîne",
                        "difficulty": 2,
                        "question_latex": "Dérivez $g(x) = \\sin(3x^2 + 1)$.",
                        "input_type": "math_expr",
                        "expected_solution": "6*x*cos(3*x^2 + 1)",
                        "hints": [
                            "Dérivée extérieure : $\\cos(3x^2 + 1)$.",
                            "Dérivée intérieure : $(3x^2 + 1)' = 6x$.",
                            "Multipliez les deux."
                        ],
                        "full_solution_latex": "g'(x) = \\cos(3x^2 + 1) \\cdot (6x) = 6x \\cos(3x^2 + 1)."
                    }
                ]
            },
            {
                "id": "m4-optimisation",
                "title": "Applications de la dérivée",
                "subtitle": "Optimisation, analyse de courbes et règle de L'Hôpital",
                "viz_type": "optimization",
                "theory": {
                    "summary": "Les extrema locaux se situent aux points critiques ($f'(x) = 0$ ou $f'(x)$ n'existe pas). La règle de L'Hôpital résout élégamment les limites indéterminées.",
                    "key_formulas": [
                        {"name": "Point critique", "latex": "f'(c) = 0 \\text{ ou } f'(c) \\text{ n'existe pas}"},
                        {"name": "Test de la dérivée seconde", "latex": "f''(c) > 0 \\implies \\text{Minimum}, \\quad f''(c) < 0 \\implies \\text{Maximum}"},
                        {"name": "Règle de L'Hôpital", "latex": "\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)} \\quad (\\text{si } \\frac{0}{0} \\text{ ou } \\frac{\\infty}{\\infty})"}
                    ],
                    "sections": [
                        {
                            "title": "1. Stratégie d'optimisation",
                            "content": "1. Identifier la quantité à maximiser/minimiser.\n2. Écrire la fonction à une seule variable grâce aux contraintes.\n3. Calculer la dérivée première et trouver les points critiques.\n4. Vérifier la nature de l'extremum (dérivée seconde ou tableau de variation)."
                        }
                    ],
                    "pitfall": "N'applique JAMAIS L'Hôpital si la limite n'est pas de la forme indéterminée 0/0 ou ∞/∞ !",
                    "method": "Pour L'Hôpital : dérive le numérateur et le dénominateur SÉPARÉMENT, ne fais PAS une dérivée de quotient !"
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
                            "En $x=0$, $e^0 - 1 = 0$ et dénominateur $= 0$. Forme $0/0$.",
                            "Dérivée du numérateur : $(e^{2x} - 1)' = 2e^{2x}$.",
                            "Dérivée du dénominateur : $(x)' = 1$."
                        ],
                        "full_solution_latex": "\\lim_{x \\to 0} \\frac{2e^{2x}}{1} = \\frac{2(1)}{1} = 2."
                    },
                    {
                        "id": "mat0150-ex8",
                        "title": "Optimisation - Rectangle d'aire maximale",
                        "difficulty": 3,
                        "question_latex": "On dispose de 40 mètres de clôture pour entourer un enclos rectangulaire. Quelle est l'aire maximale possible (en m²) ?",
                        "input_type": "math_expr",
                        "expected_solution": "100",
                        "hints": [
                            "Périmètre : $2x + 2y = 40 \\implies y = 20 - x$.",
                            "Aire : $A(x) = x(20 - x) = 20x - x^2$.",
                            "Dérivez $A'(x) = 20 - 2x = 0 \\implies x = 10$."
                        ],
                        "full_solution_latex": "A(x) = 20x - x^2. A'(x) = 20 - 2x = 0 \\implies x = 10. \\text{ Aire } = 10(10) = 100."
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
                "subtitle": "Antidérivées usuelles et constante d'intégration",
                "viz_type": "primitive",
                "theory": {
                    "summary": "L'intégration est l'opération réciproque de la dérivation. Une fonction admet une infinité d'antidérivées différant par une constante $C$.",
                    "key_formulas": [
                        {"name": "Puissance", "latex": "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)"},
                        {"name": "Logarithme", "latex": "\\int \\frac{1}{x} dx = \\ln|x| + C"},
                        {"name": "Exponentielle", "latex": "\\int e^{kx} dx = \\frac{1}{k} e^{kx} + C"}
                    ],
                    "sections": [
                        {
                            "title": "1. Linéarité de l'intégrale",
                            "content": "$\\int (a f(x) + b g(x)) dx = a \\int f(x) dx + b \\int g(x) dx$."
                        }
                    ],
                    "pitfall": "Ne JAMAIS oublier d'ajouter $+ C$ pour les intégrales indéfinies.",
                    "method": "Pour vérifier ta primitive, dérive simplement ton résultat : tu dois retrouver exactement la fonction de départ."
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
                            "Primitive de $3x^2$ : $3 \\frac{x^3}{3} = x^3$.",
                            "Primitive de $4x$ : $4 \\frac{x^2}{2} = 2x^2$."
                        ],
                        "full_solution_latex": "x^3 + 2x^2 - 5x + C."
                    }
                ]
            },
            {
                "id": "m2-integrale-definie",
                "title": "Intégrale définie et Aires",
                "subtitle": "Théorème fondamental de l'analyse et calcul d'aires",
                "viz_type": "riemann",
                "theory": {
                    "summary": "L'intégrale définie $\\int_a^b f(x)dx$ calcule l'aire nette sous la courbe entre $a$ et $b$. Le Théorème fondamental relie l'intégrale définie aux primitives.",
                    "key_formulas": [
                        {"name": "Théorème fondamental de l'analyse", "latex": "\\int_a^b f(x) dx = F(b) - F(a) = [F(x)]_a^b"},
                        {"name": "Aire entre deux courbes", "latex": "A = \\int_a^b (f(x) - g(x)) dx \\quad \\text{où } f(x) \\ge g(x)"}
                    ],
                    "sections": [
                        {
                            "title": "1. Interprétation géométrique",
                            "content": "Si $f(x) \\ge 0$, $\\int_a^b f(x)dx$ est l'aire géométrique sous la courbe. Si $f(x) < 0$, l'aire est comptabilisée négativement."
                        }
                    ],
                    "pitfall": "Pour calculer l'aire entre deux courbes qui se croisent, il faut scinder l'intégrale aux points d'intersection.",
                    "method": "1. Trouve une primitive $F(x)$. 2. Évalue $F(b)$. 3. Évalue $F(a)$. 4. Calcule $F(b) - F(a)$."
                },
                "exercises": [
                    {
                        "id": "mat0250-ex2",
                        "title": "Calcul d'intégrale définie",
                        "difficulty": 1,
                        "question_latex": "Calculez $\\int_1^3 (2x + 1) dx$.",
                        "input_type": "math_expr",
                        "expected_solution": "10",
                        "hints": [
                            "Primitive : $F(x) = x^2 + x$.",
                            "$F(3) = 3^2 + 3 = 12$.",
                            "$F(1) = 1^2 + 1 = 2$."
                        ],
                        "full_solution_latex": "[x^2 + x]_1^3 = (9 + 3) - (1 + 1) = 12 - 2 = 10."
                    },
                    {
                        "id": "mat0250-ex3",
                        "title": "Aire sous une parabole",
                        "difficulty": 2,
                        "question_latex": "Calculez l'aire comprise entre la courbe $y = x^2$, l'axe des abscisses et les droites $x = 0$ et $x = 3$.",
                        "input_type": "math_expr",
                        "expected_solution": "9",
                        "hints": [
                            "Intégrez $x^2$ de 0 à 3.",
                            "Primitive : $\\frac{x^3}{3}$.",
                            "$\\frac{3^3}{3} - 0 = \\frac{27}{3} = 9$."
                        ],
                        "full_solution_latex": "\\int_0^3 x^2 dx = \\left[\\frac{x^3}{3}\\right]_0^3 = \\frac{27}{3} - 0 = 9."
                    }
                ]
            },
            {
                "id": "m3-techniques-integration",
                "title": "Techniques d'intégration",
                "subtitle": "Substitution et intégration par parties",
                "viz_type": "techniques",
                "theory": {
                    "summary": "La substitution inverse la règle de chaîne, tandis que l'intégration par parties inverse la règle du produit.",
                    "key_formulas": [
                        {"name": "Intégration par parties", "latex": "\\int u dv = uv - \\int v du"},
                        {"name": "Changement de variable (u-sub)", "latex": "\\int f(g(x)) g'(x) dx = \\int f(u) du"},
                        {"name": "Règle mnémotechnique LIATE", "latex": "\\text{Choix de } u : \\text{Log, Inverses trigo, Algébriques, Trigo, Exp}"}
                    ],
                    "sections": [
                        {
                            "title": "1. Méthode par parties",
                            "content": "Utilisez la règle LIATE pour choisir $u$ : la première fonction dans l'ordre Logarithme, Inverse trigonométrique, Algébrique (polynôme), Trigonométrique, Exponentielle devient $u$."
                        }
                    ],
                    "pitfall": "Lors d'un changement de variable dans une intégrale définie, n'oublie pas de transformer aussi les bornes d'intégration !",
                    "method": "Pour $\\int x e^x dx$ : pose $u = x \\implies du = dx$ et $dv = e^x dx \\implies v = e^x$. Alors $uv - \\int v du = x e^x - e^x + C$."
                },
                "exercises": [
                    {
                        "id": "mat0250-ex4",
                        "title": "Substitution simple",
                        "difficulty": 2,
                        "question_latex": "Calculez $\\int 2x (x^2 + 1)^3 dx$ (omettre $+ C$).",
                        "input_type": "math_expr",
                        "expected_solution": "(x^2 + 1)^4 / 4",
                        "hints": [
                            "Posez $u = x^2 + 1 \\implies du = 2x dx$.",
                            "L'intégrale devient $\\int u^3 du = \\frac{u^4}{4}$."
                        ],
                        "full_solution_latex": "\\frac{(x^2 + 1)^4}{4} + C."
                    },
                    {
                        "id": "mat0250-ex5",
                        "title": "Intégration par parties",
                        "difficulty": 3,
                        "question_latex": "Calculez $\\int_0^1 x e^x dx$.",
                        "input_type": "math_expr",
                        "expected_solution": "1",
                        "hints": [
                            "Primitive : $x e^x - e^x$.",
                            "En $1$ : $1(e^1) - e^1 = 0$.",
                            "En $0$ : $0(e^0) - e^0 = -1$.",
                            "Résultat : $0 - (-1) = 1$."
                        ],
                        "full_solution_latex": "[x e^x - e^x]_0^1 = (e - e) - (0 - 1) = 0 - (-1) = 1."
                    }
                ]
            },
            {
                "id": "m4-probabilites",
                "title": "Probabilités et variables aléatoires",
                "subtitle": "Dénombrement, probabilités conditionnelles et loi normale",
                "viz_type": "bellcurve",
                "theory": {
                    "summary": "Ce module couvre la modélisation de l'incertitude : dénombrement (combinaisons, arrangements), probabilité conditionnelle, indépendance et la distribution normale.",
                    "key_formulas": [
                        {"name": "Combinaisons", "latex": "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}"},
                        {"name": "Probabilité conditionnelle", "latex": "P(A|B) = \\frac{P(A \\cap B)}{P(B)}"},
                        {"name": "Espérance mathématique discrète", "latex": "E[X] = \\sum x_i P(X = x_i)"},
                        {"name": "Centrage et réduction (Loi normale)", "latex": "Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1)"}
                    ],
                    "sections": [
                        {
                            "title": "1. Événements indépendants",
                            "content": "Deux événements $A$ et $B$ sont indépendants si et seulement si $P(A \\cap B) = P(A) \\times P(B)$."
                        },
                        {
                            "title": "2. Règle empirique de la loi normale",
                            "content": "Pour une variable normale $\\mathcal{N}(\\mu, \\sigma^2)$ : environ 68% des observations tombent dans $[\\mu - \\sigma, \\mu + \\sigma]$, 95% dans $[\\mu - 2\\sigma, \\mu + 2\\sigma]$ et 99.7% dans $[\\mu - 3\\sigma, \\mu + 3\\sigma]$."
                        }
                    ],
                    "pitfall": "Ne pas confondre les arrangements (l'ordre compte) et les combinaisons (l'ordre ne compte pas).",
                    "method": "Pour un calcul de probabilité d'une loi normale $X \\sim \\mathcal{N}(\\mu, \\sigma)$ : normalise toujours d'abord en calculant $Z = \\frac{X - \\mu}{\\sigma}$."
                },
                "exercises": [
                    {
                        "id": "mat0250-ex6",
                        "title": "Combinaisons",
                        "difficulty": 1,
                        "question_latex": "De combien de manières peut-on choisir un comité de 3 personnes parmi un groupe de 7 personnes (calculer $\\binom{7}{3}$) ?",
                        "input_type": "math_expr",
                        "expected_solution": "35",
                        "hints": [
                            "$\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1}$.",
                            "$\\frac{210}{6} = 35$."
                        ],
                        "full_solution_latex": "\\binom{7}{3} = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35."
                    },
                    {
                        "id": "mat0250-ex7",
                        "title": "Espérance d'une variable aléatoire",
                        "difficulty": 2,
                        "question_latex": "Soit $X$ prenant les valeurs 2 avec probabilité 0.3, et 10 avec probabilité 0.7. Calculez l'espérance $E[X]$.",
                        "input_type": "math_expr",
                        "expected_solution": "7.6",
                        "hints": [
                            "$E[X] = 2(0.3) + 10(0.7)$.",
                            "$0.6 + 7.0 = 7.6$."
                        ],
                        "full_solution_latex": "E[X] = 2(0.3) + 10(0.7) = 0.6 + 7.0 = 7.6."
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
