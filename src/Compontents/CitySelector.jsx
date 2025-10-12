import { useData } from "../Context/DataContext"
import Dropdown from "./UI/Dropdown"
import { ReactComponent as Tab } from '../Svgs/tab.svg'
import { useState } from "react"
import Button from "./UI/Button"
import Checkbox from "./UI/Checkbox"
import { GLTFExporter } from "three/examples/jsm/Addons.js"
import { useError } from "../Context/ErrorContext"

const CitySelector = () => {
    const { countries, cities, selectCountry, setSelectedCity, mesh, setElevated } = useData()
    const { setLoaderMessage, setLoaderState } = useError()
    const [open, setOpen] = useState(true)

    const formatData = (data) => {
        return Object.entries(data).map(([name, code]) => ({
            text: name.charAt(0).toUpperCase() + name.slice(1),
            value: code,
        }))
    }

    const exportObject = () => {
        setLoaderState(true)
        setLoaderMessage('Exporting object...')

        const exporter = new GLTFExporter()
        exporter.parse(
            mesh,
            (gltf) => {
                const blob = new Blob([JSON.stringify(gltf)], { type: "application/json" })
                const link = document.createElement("a")
                link.download = "Output.gltf"
                link.href = URL.createObjectURL(blob)
                link.click()
                URL.revokeObjectURL(link.href)

                setLoaderMessage('Export complete!')
                setTimeout(() => {
                    setLoaderState(false)
                    setLoaderMessage('')
                }, 1000)
            },
            (error) => {
                console.error("Export failed:", error)
                setLoaderMessage('Export failed!')
                setTimeout(() => {
                    setLoaderState(false)
                    setLoaderMessage('')
                }, 1500)
            },
            { binary: false }
        )
    }

    return <div style={{ zIndex: 1, position: 'absolute', top: '10px', right: '10px', padding: '20px 20px', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(5px)', borderRadius: '3px', maxWidth: '80vw', transform: `translateX(${open ? '0px' : '101%'})`, transition: '.3s all', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
        <div onClick={() => setOpen(prev => !prev)} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'}
            style={{ boxShadow: '0 2px 3px rgba(0,0,0,0.2)', transition: '.5s all', width: '30px', height: '30px', left: '-35px', position: 'absolute', top: '0', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(5px)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Tab style={{ width: '20px', height: '20px', scale: open ? '1' : '-1', }} />
        </div>

        <div style={{ margin: ' 0 0 20px 0' }}>
            <h4>Select a country</h4>
            <Dropdown disabled={!Object.keys(countries).length} options={() => formatData(countries)} placeholder="Search country..." onChange={(e) => selectCountry(e.value)} />
        </div>

        <div style={{ margin: '20px 0 10px 0' }}>
            <h4>Select a city</h4>
            <Dropdown disabled={!Object.keys(cities).length} options={() => formatData(cities)} placeholder="Search city..." onChange={(e) => setSelectedCity(e.value)} />
        </div>

        <Checkbox label='Ignore elevation' onChange={(checked) => setElevated(!checked)} />
        <Button label='Export as .GTFL File' onClick={exportObject} />
    </div>
}

export default CitySelector