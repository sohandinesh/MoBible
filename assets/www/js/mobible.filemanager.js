function FileManager(name, fullPath)
{
   var _db = window.localStorage;
   var _tableName = 'files';

   this.name = name;
   this.fullPath = fullPath;

   this.save = function(files)
   {
      _db.setItem(_tableName, JSON.stringify(files));
   }

   this.load = function()
   {
      return JSON.parse(_db.getItem(_tableName));
   }
}

FileManager.prototype.addFile = function()
{
   var index = FileManager.getIndex(this.fullPath);
   var files = FileManager.getFileManagers();

   if (index === false)
      files.push(this);
   else
      files[index] = this;

   this.save(files);
};

FileManager.prototype.deleteFile = function()
{
   var index = FileManager.getIndex(this.fullPath);
   var files = FileManager.getFileManagers();
   if (index !== false)
   {
      files.splice(index, 1);
      this.save(files);
   }

   return files;
};

FileManager.prototype.compareTo = function(other)
{
   return FileManager.compare(this, other);
};

FileManager.prototype.compareToIgnoreCase = function(other)
{
   return FileManager.compareIgnoreCase(this, other);
};

FileManager.EXTENSIONS = ['.mp3', '.wav', '.m4a'];

FileManager.compare = function(FileManager, other)
{
   if (other == null)
      return 1;
   else if (FileManager == null)
      return -1;

   return FileManager.name.localeCompare(other.name);
};

FileManager.compareIgnoreCase = function(FileManager, other)
{
   if (other == null)
      return 1;
   else if (FileManager == null)
      return -1;

   return FileManager.name.toUpperCase().localeCompare(other.name.toUpperCase());
};

FileManager.getFileManagers = function()
{
   var files = new FileManager().load();
   return (files === null) ? [] : files;
};

FileManager.getFileManager = function(path)
{
   var index = FileManager.getIndex(path);
   if (index === false)
      return null;
   else
   {
      var file = FileManager.getFileManagers()[index];
      return new FileManager(file.name, file.fullPath);
   }
};

FileManager.getIndex = function(path)
{
   var files = FileManager.getFileManagers();
   for(var i = 0; i < files.length; i++)
   {
      if (files[i].fullPath.toUpperCase() === path.toUpperCase())
         return i;
   }

   return false;
};

FileManager.deleteFiles = function()
{
   new FileManager().save([]);
};