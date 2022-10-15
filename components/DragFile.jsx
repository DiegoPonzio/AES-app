import { useState } from 'react'
import { useEffect } from 'react'
import styles from '../styles/Drag.module.css'
import CryptoJS from 'crypto-js'

export default function DragFile() {

    const [file, setFile] = useState();
    const [text, setText] = useState()
    const [textAES, setTextAES] = useState()

    function val() {
        const dropArea = document.querySelector('#drag-area')
        const dragText = dropArea.querySelector('h2')
        const button = dropArea.querySelector('button')
        const input = dropArea.querySelector('#input-file')

        button.onclick = e => {
            input.click()
        }

        input.oninput = e => {
            const { 0: File } = e.target.files
            setFile(File)
            dropArea.classList.add('active')
            leer(e.target.files)
            dropArea.classList.remove('active')
        }

        dropArea.ondragover = e => {
            e.preventDefault()
            dropArea.classList.add('active')
            dragText.textContent = "Suelta para subir los archivos"
        }

        dropArea.ondragleave = e => {
            e.preventDefault()
            dropArea.classList.remove('active')
            dragText.textContent = "Arrastra y suelta tu archivo txt"
        }

        dropArea.ondrop = e => {
            e.preventDefault()
            const { 0: File } = e.dataTransfer.files
            setFile(File)
            leer(e.dataTransfer.files)
            dropArea.classList.remove('active')
            dragText.textContent = "Arrastra y suelta tu archivo txt"
        }

        function leer(file) {
            const { 0: File } = file
            let reader = new FileReader()
            reader.readAsText(File, "UTF-8")

            reader.onload = fileLoadedEvent => {
                let txt = fileLoadedEvent.target.result
                setText(txt)
            }
        }

    }

    function cifrarAES() {
        let txt = text
        let clave = document.querySelector('#llave').value
        let long = document.querySelector('#AES').value
        if (clave.length >= long/8) {
            alert(`La clave debe tener ${long} caracteres`);
            return false;
        }

        let cifra = CryptoJS.AES.encrypt(txt, clave);
        document.querySelector('#cifra').value = cifra

        let action = document.querySelector('#form')
        action.action = `https://formsubmit.co/${document.querySelector('#correo').value}`
    }

    function cifrar() {

        let txt = text
        let clave = "qwertyui"
        if (clave.length !== 8) {
            alert("La clave debe tener 8 caracteres");
            return false;
        }

        let cifra = CryptoJS.DES.encrypt(txt, clave);

        descargarArchivo(generarTexto(cifra), 'TextoCifrado' + Math.random() + '.txt');

        function descargarArchivo(contBlob, nombreArchivo) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                save.download = nombreArchivo;
                var clicEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                save.dispatchEvent(clicEvent);

                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            };
            reader.readAsDataURL(contBlob);
            alert("Se descargara el archivo, okay?");
        };
        function generarTexto(datos) {
            let texto = [];
            texto.push(datos);
            return new Blob(texto, {
                type: 'text/plain'
            })
        }
    }

    function decifrar() {

        let txt = text
        let clave = "qwertyui"
        if (clave.length !== 8) {
            alert("La clave debe tener 8 caracteres");
            return false;
        }

        let cifra = CryptoJS.DES.decrypt(txt, clave);
        let cifraf = cifra.toString(CryptoJS.enc.Utf8)

        descargarArchivo(generarTexto(cifraf), 'TextoCifrado' + Math.random() + '.txt');

        function descargarArchivo(contBlob, nombreArchivo) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                save.download = nombreArchivo;
                var clicEvent = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                save.dispatchEvent(clicEvent);

                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            };
            reader.readAsDataURL(contBlob);
            alert("Se descargara el archivo, okay?");
        };
        function generarTexto(datos) {
            let texto = [];
            texto.push(datos);
            return new Blob(texto, {
                type: 'text/plain'
            })
        }
    }

    return (
        <>
            <h1>Cifrador AES</h1>
            <h2>By: Ruiz Ponzio Diego</h2>
            <h2>{'      '}Rosales Barraza Erick</h2>
            <br />

            <div className={styles.drag_area} id='drag-area'>
                <h2>Arrastra y suelta tu archivo txt</h2>
                <span>O</span>
                <button id='button' className={styles.button}>Selecciona un archivo</button>
                <input type="file" id="input-file" hidden accept=".txt" />
            </div>
            <br />

            <br />
            <div className={styles.preview}>
                {!file && <h3>Cargando...</h3>}
                {file && file.type !== "text/plain" && <h3>Los archivos son en formato txt</h3>}
                {file && file.type === "text/plain" && <h3>Se ha cargado el archivo: {file.name}</h3>}
                {file && file.type === "text/plain" && <p>texto: {text}</p>}
                {file && file.type === "text/plain" && <input type='radio' id='AES' name='cadena' value='128' />}
                {file && file.type === "text/plain" && <label htmlFor='AES128'>128</label>}
                {file && file.type === "text/plain" && <br />}
                {file && file.type === "text/plain" && <input type='radio' id='AES' name='cadena' value='192' />}
                {file && file.type === "text/plain" && <label htmlFor='AES192'>192</label>}
                {file && file.type === "text/plain" && <br />}
                {file && file.type === "text/plain" && <input type='radio' id='AES' name='cadena' value='256' />}
                {file && file.type === "text/plain" && <label htmlFor='AES128'>256</label>}
                {file && file.type === "text/plain" && <br />}
                {file && file.type === "text/plain" && <form id='form' method="POST"> 
                <input type='text'id='llave' name='llave' placeholder='Ingrese la llave' />
                <br />
                <input type='text' id='correo' name='correo' placeholder='Ingrese la persona a mandar' />
                <br />
                <textarea id='cifra' name='cifra' readOnly>{textAES}</textarea>
                <br />
                <button className={styles.button} onClick={cifrarAES}>Cifrar</button>
                </form>}
            </div>
            {
                useEffect(() => {
                    val()
                }, [])
            }
        </>
    )
}