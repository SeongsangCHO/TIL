class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        stk = []
        top = ""
        arr = list(s)
        for v in arr:
            if((v == ')' or v == ']' or v == '}')):
                if(len(stk) == 0):
                    return False
                top = stk.pop()
                if(top == '(' and v == ')'):
                    continue
                elif(top == '[' and v == ']'):
                    continue
                elif(top == '{' and v == '}'):
                    continue
                else:
                    return False
            if v == "(":
                stk.append("(")
            if v == "[":
                stk.append("[")
            if v == "{":
                stk.append("{")
        return len(stk) == 0
    isValid("", "]()")
