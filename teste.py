import json

def atualizaKey(key):
	keysValues = {}

	keys = open('keys.json', 'r')
	keysValues = json.load(keys)
	keys.close()

	keysValues[key] = True
	print(keysValues)

	keys = open('keys.json', 'w')
	json.dump(keysValues, keys)
	keys.close()

	print(keysValues)

atualizaKey('left')