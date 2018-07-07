#include <Keyboard.h>
const byte pins[] = {2, 4, 7, 8, 12, 18, 19, 20, 21, 22}; //10
const byte keys[] = {100, 119, 97, 115, 120, 121, KEY_RIGHT_ARROW, KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW};
const byte leds[] = {9, 6, 3, 5};

int pot = 23;
int sleepDelay = 9awy00;
int timeSinceButtonPressed = sleepDelay;
int ledstripBrightness = 255;  // 0 - 255;
int buttonLedBrightness = 255; // 0 - 255;

int lightUpButton = 0;
int lightUpButtonDelay = 40;
int timeSinceSleep = 0;

void setup() {
//  Serial.begin(115200);
//  while (!Serial) { }
  Keyboard.begin();
  for (int i = 0; i < sizeof(pins); i++) {
    pinMode(pins[i], INPUT_PULLUP);
  }
  for (int i = 0; i < sizeof(leds); i++) {
    pinMode(leds[i], OUTPUT);
  }
  pinMode(pot, INPUT);
  Keyboard.releaseAll();
  buttonLedBrightness = map(analogRead(pot), 0, 1023, 0, 255);
  //  Serial.println("started");
}

void loop() {
  for (int i = 0; i < sizeof(pins); i++) {
    if (digitalRead(pins[i]) == LOW) {
      Keyboard.press(keys[i]);
      timeSinceButtonPressed = 0;
      if (i < sizeof(leds)) {
        analogWrite(leds[i], buttonLedBrightness);
      }
    } else {
      Keyboard.release(keys[i]);
      if (i < sizeof(leds) && timeSinceSleep == 0) {
        analogWrite(leds[i], 0);
      }
    }
  }

  if (timeSinceButtonPressed < sleepDelay) { //doesnt matter if its slow
    timeSinceButtonPressed++;
    timeSinceSleep = 0;
  } else {
    buttonLedBrightness = map(analogRead(pot), 0, 1023, 0, 255);
    timeSinceSleep++;
//    Serial.println(timeSinceSleep);
    if (timeSinceSleep % lightUpButtonDelay == 0) {
      for (int i = 0; i < sizeof(leds); i++) {
        analogWrite(leds[i], 0);
      }
      analogWrite(leds[lightUpButton], buttonLedBrightness);
      lightUpButton++;
      if (lightUpButton >= sizeof(leds)) {
        lightUpButton = 0;
      }
      timeSinceSleep = 1;
    }
  }
  delay(1);
}
