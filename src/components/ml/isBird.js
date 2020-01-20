import matplotlib.pylab as plt
import numpy as np
import cv2
import tensorflow as tf
from time import sleep

interpreter = tf.lite.Interpreter(model_path="./tf_models/detect.tflite")

def isBird(test_img):
#function controls
#confidence level needed to pass check
conf_level = .65
#return elements
return_array = []
class_det_array = []
conf_det_array = []
return_bool = False
return_array.clear()
class_det_array.clear()
conf_det_array.clear()

#model load and check, make sure its defined and the right size

interpreter.allocate_tensors()
model_input_details = interpreter.get_input_details()
model_output_details = interpreter.get_output_details()
model_height = model_input_details[0]['shape'][1]
model_width = model_input_details[0]['shape'][2]

#pass in test image, resize and call for prediction, no model.predict becasue its a tflite flat file using the interpreter

#test_img = np.array(test_img)
test_img = cv2.resize(test_img,(model_width, model_height))
input_data = np.expand_dims(test_img, axis=0)
interpreter.set_tensor(model_input_details[0]['index'], input_data)
interpreter.invoke()

# output shape details are here https://www.tensorflow.org/lite/models/object_detection/overview#starter_model
    output_box_list = interpreter.get_tensor(model_output_details[0]['index'])
output_class_list = interpreter.get_tensor(model_output_details[1]['index'])
output_conf_list = interpreter.get_tensor(model_output_details[2]['index'])


#run through list with both index and element value accessible
for index, elem in enumerate(output_class_list[0]):
#labels not needed since no human is looking here, so bird class is [15] labelmap.txt is here /content/gdrive/My Drive/MLCourse (1)/MidTerm/TFModel/ should you need it
if elem == 15:
if output_conf_list[0][index] > conf_level:
return_array.append(output_box_list[0][index])
class_det_array.append(elem)
conf_det_array.append(output_conf_list[0][index])
#return Bool, number of confident (using conf_level variable in top of isBird()) bird boxes and box edges it's normalized, top, left, bottom, right see https://www.tensorflow.org/lite/models/object_detection/overview#starter_model
if int(len(return_array)) > 0:
return_bool = True
#print(return_bool, class_det_array, conf_det_array)
return [return_bool, class_det_array, conf_det_array , int(len(return_array)),return_array]

#isBird(cv2.imread('/media/fisher/ubuntu16/home/fisher/Projects/birds/MMWML_week5_Bird-Calssifier/test/not-bird/person1.jpg'))

