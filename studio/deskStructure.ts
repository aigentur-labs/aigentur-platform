import {StructureBuilder} from "sanity/desk"
import {User} from "sanity"

export const deskStructure = (
  S: StructureBuilder,
  context: { currentUser: User }
) => {
  const user = context.currentUser
  const userEmail = user?.email

  const isAdmin = user?.roles?.some((role) => role.name === "administrator")

  // ADMIN → sees all content
  if (isAdmin) {
    return S.list()
      .title("Content")
      .items([
        // All clients
        S.listItem()
          .title("Clients")
          .child(S.documentTypeList("client")),

        S.divider(),

        // Admin tools
        S.documentTypeListItem("post").title("All Posts"),
        S.documentTypeListItem("category").title("All Categories"),
      ])
  }

  // CLIENT → only see own content
  return S.list()
    .title("Your Content")
    .items([
      S.listItem()
        .title("Posts")
        .child(
          S.documentList()
            .title("Your Posts")
            .filter('_type == "post" && client->ownerUserEmail == $email')
            .params({ email: userEmail })
        ),

      S.listItem()
        .title("Categories")
        .child(
          S.documentList()
            .title("Your Categories")
            .filter('_type == "category" && client->ownerUserEmail == $email')
            .params({ email: userEmail })
        ),

      S.listItem()
        .title("Client Settings")
        .child(
          S.documentList()
            .title("Client Settings")
            .filter('_type == "client" && ownerUserEmail == $email')
            .params({ email: userEmail })
        ),
    ])
}
