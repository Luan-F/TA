import serial
import time
# from datetime import datetime
import pyautogui
import json

# Variáveis usadas
valor_botao = 62
c = 0
entrada_antiga = tempo = 0
lastCommand = 'enter'

dados = {}
maior = 3000

with open('config.json', 'r') as config:
	dados = json.load(config)
	for i in dados:
		if dados[i][1] > maior:
			maior = dados[i][1]

# Tempo em milisegundos
def ms():
	return round(time.time()*1000)

# Contador do tempo
def tempoPressionado(botao, botao_anterior):
	global tempo, lastCommand
	dt = ms() - tempo
	if botao == valor_botao and botao_anterior != valor_botao:
		tempo = ms()
	elif botao != valor_botao and botao_anterior == valor_botao:
		return True
	elif botao == valor_botao and dt > maior:	
		print(lastCommand)
		pyautogui.press(lastCommand)

	return False

#
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

# Aperta uma teclada de acordo com o tempo
def comando(tempo):
	global lastCommand
	tecla = lastCommand

	for key in dados:
		t1, t2 = dados[key]
		if tempo > t1 and tempo <= t2:
			tecla = key
			atualizaKey(key)
			break

	# if tecla == lastCommand and tempo > dados[tecla][1]:
	# 	return

	# if tempo <= 1000:
	# 	tecla = 'enter'
	# elif tempo > 1000 and tempo <= 2000:
	# 	tecla = 'left'
	# elif tempo > 2000 and tempo <= 3000:
	# 	tecla = 'right'
	# else:
	# 	return

	print(tecla)
	pyautogui.press(tecla)
	lastCommand = tecla

# Setup
ser = serial.Serial('/dev/ttyUSB0', 9600)
time.sleep(1.5)
print(ser.port)

while 1:
	c += 1
	
	entrada = str(ser.readline().decode().strip('\r\n'))
	print(entrada)
	if entrada != '':
		entrada = int(entrada)

	res = tempoPressionado(entrada, entrada_antiga)

	if res:
		dt = ms() - tempo
		print(dt)
		comando(dt)

	time.sleep(0.001)
	entrada_antiga = entrada
