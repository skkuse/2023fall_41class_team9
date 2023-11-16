file_name = 'Test.java'
code = ''
with open(file_name, 'r') as file:
        lines = file.readlines()
for l in lines:
        code += l

code = code.replace('\n','\\n')
print(code)