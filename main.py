import sys
from communication import Communication

# ser = Communication()

import sys
import sys
from PyQt5.QtWidgets import QApplication,QLabel, QWidget, QPushButton, QVBoxLayout, QLabel, QMessageBox, QDesktopWidget
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QPixmap

class MyApp(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        # Create a vertical layout
        layout = QVBoxLayout()

        # Set the window's background color
        self.setStyleSheet("background-color: black;")

        self.imageLabel = QLabel(self)
        pixmap = QPixmap('logo.jpeg')
        resizedPixmap = pixmap.scaled(100, 100, Qt.KeepAspectRatio, Qt.SmoothTransformation)
        self.imageLabel.setPixmap(resizedPixmap)
        
        self.imageLabel.setAlignment(Qt.AlignHCenter)
        layout.addWidget(self.imageLabel)

        # Add a label with some information, and center its text
        self.label = QLabel('Some information here', self)
        self.label.setAlignment(Qt.AlignHCenter)
        layout.addWidget(self.label)

        # Add a "Start Configuration" button
        self.startBtn = QPushButton('Start Configuration', self)
        self.startBtn.clicked.connect(self.startConfiguration)
        layout.addWidget(self.startBtn)

        # Set the layout on the application's window
        self.setLayout(layout)

        # Set the window's properties
        self.setWindowTitle('Configuration App')
        self.centerAndResize()

        self.show()

    def centerAndResize(self):
        # Get the screen size
        screen = QDesktopWidget().screenGeometry()
        print(screen.width(), screen.height())
        self.resize(int(screen.width() * 0.5), int(screen.height() * 0.4))
        # Move the window to the center
        # self.move((screen.width() - self.width()) // 2, (screen.height() - self.height()) // 2)

    def startConfiguration(self):
        # This method is called when the button is clicked.
        # You can add your configuration steps here.
        QMessageBox.information(self, 'Configuration', 'Starting configuration...', QMessageBox.Ok)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = MyApp()
    sys.exit(app.exec_())
