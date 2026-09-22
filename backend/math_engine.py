import re
import sympy as sp
from sympy.parsing.sympy_parser import (
    parse_expr,
    standard_transformations,
    implicit_multiplication_application,
    convert_xor,
)

transformations = standard_transformations + (
    implicit_multiplication_application,
    convert_xor,
)

def sanitize_latex_or_text(expr_str: str) -> str:
    """Nettoie une expression texte ou simple LaTeX pour le parser SymPy."""
    if not expr_str:
        return ""
    s = expr_str.strip()
    # Remplacement de e isolé par E (constante d'Euler dans SymPy)
    s = re.sub(r"\be\b", "E", s)
    s = s.replace(r"\cdot", "*").replace(r"\times", "*")
    s = s.replace(r"\frac", "")
    s = s.replace(r"\pi", "pi")
    s = s.replace(r"\sqrt", "sqrt")
    s = s.replace(r"\sin", "sin").replace(r"\cos", "cos").replace(r"\tan", "tan")
    s = s.replace(r"\ln", "ln").replace(r"\exp", "exp")
    s = s.replace("^", "**")
    # Supprime accolades LaTeX éventuelles {x} -> (x)
    s = s.replace("{", "(").replace("}", ")")
    # Supprime les $ s'il y en a
    s = s.replace("$", "")
    return s

def parse_math_expression(expr_str: str):
    """Parse une chaîne en expression SymPy de façon sécurisée."""
    cleaned = sanitize_latex_or_text(expr_str)
    try:
        return parse_expr(cleaned, transformations=transformations)
    except Exception:
        # Deuxième tentative avec remplacement d'espaces
        cleaned2 = re.sub(r"\s+", "", cleaned)
        return parse_expr(cleaned2, transformations=transformations)

def verify_symbolic_equivalence(user_input: str, solution: str) -> dict:
    """
    Vérifie rigoureusement si la réponse de l'utilisateur est mathématiquement
    équivalente à la solution attendue.
    """
    if not user_input or not solution:
        return {"correct": False, "message": "Entrée vide."}

    user_clean = user_input.strip().lower()
    sol_clean = solution.strip().lower()

    # 1. Correspondance textuelle directe
    if user_clean == sol_clean:
        return {"correct": True, "details": "Correspondance exacte."}

    # 2. Gestion de vecteurs sous forme (x, y, z) ou [x, y, z]
    vec_pattern = r"^[\(\[]\s*([^,\(\)\[\]]+)\s*,\s*([^,\(\)\[\]]+)(?:\s*,\s*([^,\(\)\[\]]+))?\s*[\)\]]$"
    u_match = re.match(vec_pattern, user_input.strip())
    s_match = re.match(vec_pattern, solution.strip())

    if u_match and s_match:
        u_groups = [g for g in u_match.groups() if g is not None]
        s_groups = [g for g in s_match.groups() if g is not None]
        if len(u_groups) == len(s_groups):
            all_match = True
            for ug, sg in zip(u_groups, s_groups):
                sub_res = verify_symbolic_equivalence(ug, sg)
                if not sub_res["correct"]:
                    all_match = False
                    break
            if all_match:
                return {"correct": True, "details": "Vecteur équivalent."}

    # 3. Évaluation symbolique via SymPy
    try:
        user_sym = parse_math_expression(user_input)
        sol_sym = parse_math_expression(solution)

        diff = sp.simplify(user_sym - sol_sym)
        if diff == 0:
            return {"correct": True, "details": "Équivalence symbolique vérifiée."}

        # Tentative trigonométrique
        trig_diff = sp.trigsimp(diff)
        if trig_diff == 0:
            return {"correct": True, "details": "Identité trigonométrique vérifiée."}

        # Tentative numérique sur variables libres
        free_symbols = list(user_sym.free_symbols | sol_sym.free_symbols)
        if free_symbols:
            test_points = [0.5, 1.2, 2.7, 3.1]
            all_close = True
            for pt in test_points:
                subs_map = {sym: pt + idx * 0.3 for idx, sym in enumerate(free_symbols)}
                try:
                    val_u = float(sp.N(user_sym.subs(subs_map)))
                    val_s = float(sp.N(sol_sym.subs(subs_map)))
                    if abs(val_u - val_s) > 1e-5:
                        all_close = False
                        break
                except Exception:
                    all_close = False
                    break
            if all_close:
                return {"correct": True, "details": "Équivalence numérique confirmée."}
        else:
            # Constantes numériques (ex: fractions vs décimaux, 1/2 vs 0.5)
            val_u = float(sp.N(user_sym))
            val_s = float(sp.N(sol_sym))
            if abs(val_u - val_s) < 1e-5:
                return {"correct": True, "details": "Équivalence numérique confirmée."}

        return {"correct": False, "message": "La valeur ou l'expression ne correspond pas à la solution attendue."}

    except Exception as e:
        # Si le parseur échoue (ex: texte explicatif ou QCM lettre A, B, C, D)
        if user_clean.strip("().") == sol_clean.strip("()."):
            return {"correct": True, "details": "Option valide."}
        return {"correct": False, "message": f"Forme non reconnue ou erronée : {str(e)}"}

def calculate_derivative(expr_str: str, var_str: str = "x") -> str:
    """Calcule la dérivée symbolique exacte."""
    expr = parse_math_expression(expr_str)
    var = sp.Symbol(var_str)
    res = sp.diff(expr, var)
    return sp.latex(res)

def calculate_integral(expr_str: str, var_str: str = "x") -> str:
    """Calcule l'intégrale indéfinie exacte."""
    expr = parse_math_expression(expr_str)
    var = sp.Symbol(var_str)
    res = sp.integrate(expr, var)
    return sp.latex(res)
