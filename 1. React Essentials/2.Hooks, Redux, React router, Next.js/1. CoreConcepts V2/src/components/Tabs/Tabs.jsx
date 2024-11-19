const Tabs = ({ children, tabs, TabsContainer = 'menu' }) => {
    /*
    TabsContainer: Pasamos el parametro con la primera mayuscula, asi simulamos que es un 
    componente y podemos utilizarlo directamente como etiqueta. Al parametro podemos pasarle 
    tanto componentes como etiquetas html 
     */
    return (
        <>
            <TabsContainer>
                {tabs}
            </TabsContainer>
            {children}
        </>
    )
}

export default Tabs
