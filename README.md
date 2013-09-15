Timeline
========
  * Year based(normal and academic).
  * Contents are divided based on hashtags.
  * Hashtags are created only by admin.
  * Creation: Authenticated user with permission to add that hashtag can add it.
  * Editing: group_hashtag table will have a column(Primary|Secondary). People with primary hashtag can edit the content.

## Creating a new content
  * Content Title
  * Description(300 words)-RTE/CKEditor
  * StartTime,Endtime(Includes D/M/Y)
  * Priority(1-10)
  * Year(Acad and normal).
  * Multiple Select Hashtags(Primary)
  * Multiple Select Hashtags(Secondary)(Non Editable)<br/>
     &nbsp;&nbsp;&nbsp; [People with secondary hashtag permission and without primary hastag permission cannot remove it.]
##ToDO
  * Content 
  * Graph Implementation(All graphs)
  * Login(OpenId,Normal,webmail)
  * 
