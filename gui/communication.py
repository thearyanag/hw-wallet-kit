import serial
import serial.tools.list_ports

class Communication:
    baudrate = ''
    portName = ''
    ports = serial.tools.list_ports.comports()
    ser = serial.Serial()

    def __init__(self):
        self.baudrate = 9600
        print("the available ports are (if none appear, check your connection): ")
        for port in sorted(self.ports):
            print(("{}".format(port)))
        self.portName = input("write serial port name (ex: /dev/ttyUSB0): ")
        try:
            self.ser = serial.Serial(self.portName, self.baudrate)
        except serial.serialutil.SerialException:
            print("Can't open : ", self.portName , " Please check the port name")
            exit()

    def close(self):
        if(self.ser.isOpen()):
            self.ser.close()
        else:
            print(self.portName, " it's already closed")

    def getData(self):
        print("hey, I'm reading data from the serial port")
        self.ser.read_all()
        value = self.ser.readline()  # read line (single value) from the serial port
        print(value)
        decoded_bytes = str(value[0:len(value) - 2].decode("utf-8"))
        print(decoded_bytes)
        return decoded_bytes

    
    def sendData(self, command):
        if self.dummyPlug:
            print(f"Dummy mode: Sending command {command}")
        else:
            try:
                self.ser.write(command.encode())  # Send command as bytes
                print(f"Sent command: {command}")
            except serial.serialutil.SerialException as e:
                print(f"Failed to send command: {e}")


    def isOpen(self):
        return self.ser.isOpen()