import {StructureBuilder} from 'sanity/desk'
import {User} from 'sanity'

export const deskStructure = (S: StructureBuilder, context: {currentUser: User}) => {
  const user = context.currentUser

  const isAdmin = user?.roles?.some((r) => r.name === 'administrator')

  // ADMIN VIEW → sees all clients
  if (isAdmin) {
    return S.list()
      .title('Content')
      .items([
        // List all clients
        S.listItem()
          .title('Clients')
          .child(
            S.documentTypeList('client').child((clientId) =>
              // When clicking a client → show filtered content
              S.list()
                .title('Client Content')
                .items([
                  S.listItem()
                    .title('Posts')
                    .child(
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && client._ref == $clientId')
                        .params({clientId})
                    ),

                  S.listItem()
                    .title('Categories')
                    .child(
                      S.documentList()
                        .title('Categories')
                        .filter('_type == "category" && client._ref == $clientId')
                        .params({clientId})
                    ),
                ])
            )
          ),

        S.divider(),

        // Optional admin tools
        S.documentTypeListItem('post'),
        S.documentTypeListItem('category'),
        S.documentTypeListItem('client'),
      ])
  }

  // CLIENT VIEW (not admin) → only see their own content
  const clientRef = user?.id // We will map this to a field in the role

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Posts')
        .child(
          S.documentList()
            .title('Posts')
            .filter('_type == "post" && client._ref == $clientId')
            .params({clientId: clientRef})
        ),

      S.listItem()
        .title('Categories')
        .child(
          S.documentList()
            .title('Categories')
            .filter('_type == "category" && client._ref == $clientId')
            .params({clientId: clientRef})
        ),

      S.listItem()
        .title('Client Settings')
        .child(
          S.editor()
            .id('client')
            .schemaType('client')
            .documentId(clientRef)
        ),
    ])
}
